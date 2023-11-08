import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { xdr } from "soroban-client";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { scValtypes } from "@/lib/utils";

export interface ContractInvokeProps
    extends React.HTMLAttributes<HTMLDivElement> {
    contractAddress: string;
    abi: any;
}

export const ContractInvoke = ({ contractAddress, abi }: ContractInvokeProps) => {
    const { toast } = useToast();
    const { sdk } = useSorosanSDK();

    const [methodData, setMethodData] = useState<any>({});
    const [methods, setMethods] = useState<any>([]);
    const [callMethod, setCallMethod] = useState<string[]>([]);
    const [callData, setCallData] = useState<any>({});
    const [isCallingMethod, setIsCallingMethod] = useState<boolean>(false);

    useEffect(() => {
        let methodData: any = {};
        console.log(abi);
        abi.forEach((method: any) => {
            const hasReturn = method.outputs?.length > 0;

            hasReturn && setCallMethod((old: string[]) => [...old, method.name]);

            methodData[method.name] = {};
            method.inputs.forEach((param: { doc: string, value: number, type: string, name: string }) => {
                methodData[method.name][param.name] = {
                    type: scSpecTypeToScVal(param.type),
                    value: "",
                }
            })
        })

        // console.log(abi);
        // console.log(methodData);
        setMethodData(methodData);
        setMethods(abi);
    }, [])

    const handleChangeMethodData = (method: string, param: string, type: string, val: string) => {
        let value: any = handleTypeChange(val, type);
        setMethodData({
            ...methodData,
            [method]: {
                ...methodData[method],
                [param]: {
                    type,
                    value,
                }
            }
        })
    }

    const handleCallMethod = async (method: string) => {
        setIsCallingMethod(true);
        toast({
            title: `Calling ${method}`,
            description: "Please wait...",
        });
        try {
            await executeCallMethod(method);
        } catch (error) {
            console.error(error);
            toast({
                title: "Transaction failed",
                description: "Transaction failed",
            });
        }
        setIsCallingMethod(false);

    }

    const executeCallMethod = async (method: string) => {
        const params: xdr.ScVal[] = Object.keys(methodData[method] || []).map(key => {
            return sdk.nativeToScVal(methodData[method][key].value, methodData[method][key].type.toLowerCase())
        });

        let title = "Transaction successful";
        let description = "Transaction signed and sent to the network.";
        if (callMethod.includes(method)) {
            console.log("calling", contractAddress, method, params);
            const value: any = await sdk.call(contractAddress, method, params);

            if (value === null || value === undefined) {
                title = "Transaction failed";
                description = "Transaction failed";
            }

            console.log("call", value)
            setCallData({
                ...callData,
                [method]: value,
            });
        } else {
            console.log("sending", contractAddress, method, params);
            const success = await sdk.send(contractAddress, method, params);

            if (!success) {
                title = "Transaction failed";
                description = "Transaction failed";
            }
        }

        toast({ title, description });
    }

    const handleTypeChange = (param: string, type: string) => {
        switch (type) {
            case "address":
                return param;
            case "address":
                return param;
            case "i128":
            case "u32":
                return parseInt(param);
            case "bool":
                return param === "true";
            default:
                return param;
        }
    }

    const getInputType = (type: string) => {
        switch (type) {
            case xdr.ScSpecType.scSpecTypeI128().name:
            case xdr.ScSpecType.scSpecTypeI256().name:
            case xdr.ScSpecType.scSpecTypeI32().name:
            case xdr.ScSpecType.scSpecTypeI64().name:
            case xdr.ScSpecType.scSpecTypeU128().name:
            case xdr.ScSpecType.scSpecTypeU256().name:
            case xdr.ScSpecType.scSpecTypeU32().name:
            case xdr.ScSpecType.scSpecTypeU64().name:
                return "number";
            case xdr.ScSpecType.scSpecTypeBool().name:
                return "checkbox";
            case xdr.ScSpecType.scSpecTypeAddress().name:
            default:
                return "text";
        }
    }

    const handleCallData = (data: any): string => {
        switch (typeof data) {
            case "string":
                return data;
            case "number":
                return data.toString();
            case "boolean":
                return data.toString();
            case "bigint":
                return data.toString() || "0";
            case "object":
                if (Array.isArray(data))
                    return data.map((item: any) => handleCallData(item)).join(", ");
                else
                    return JSON.stringify(data, (key, value) =>
                        typeof value === 'bigint'
                            ? value.toString()
                            : value // return everything else unchanged
                    );
            default:
                return data.toString();
        }
    }
    const scValTypes: string[] = [
        xdr.ScValType.scvBool().name,
        xdr.ScValType.scvString().name,
        xdr.ScValType.scvAddress().name,
        xdr.ScValType.scvU32().name,
        xdr.ScValType.scvI32().name,
        xdr.ScValType.scvU64().name,
        xdr.ScValType.scvI64().name,
        xdr.ScValType.scvTimepoint().name,
        xdr.ScValType.scvDuration().name,
        xdr.ScValType.scvU128().name,
        xdr.ScValType.scvI128().name,
        xdr.ScValType.scvU256().name,
        xdr.ScValType.scvI256().name,
        xdr.ScValType.scvBytes().name,
        xdr.ScValType.scvSymbol().name,
        xdr.ScValType.scvVec().name,
        xdr.ScValType.scvMap().name,
        xdr.ScValType.scvContractInstance().name,
        // xdr.ScValType.scvVoid().name,
        // xdr.ScValType.scvError().name,
        // xdr.ScValType.scvLedgerKeyContractInstance().name,
        // xdr.ScValType.scvLedgerKeyNonce().name,
    ];

    /**
     * Updates the type of a parameter in a contract's ABI and method data.
     *
     * @param {string} name - The name of the method in the ABI.
     * @param {string} param - The name of the parameter to update.
     * @param {string} newType - The new type for the parameter.
     */
    const changeContractType = (name: string, param: string, newType: string) => {
        console.log(name, param, newType)
        // Create a copy of the ABI array to avoid mutating the original ABI.
        const abiCopy = [...abi];

        // Find the index of the method with the specified name in the ABI.
        const methodIndex = abiCopy.findIndex(x => x.name === name);
        if (methodIndex < 0) return;
        const paramIndex = abiCopy[methodIndex].inputs.findIndex((x: any) => x.name === param);
        if (paramIndex < 0) return;

        // Update the type of the parameter in the ABI.
        abiCopy[methodIndex].inputs[paramIndex].type = newType;

        // Create a copy of the methodData and update
        const methodDataCopy = { ...methodData };
        methodDataCopy[name][param].type = newType;

        // Set the state
        setMethodData(methodDataCopy);
        setMethods(abiCopy);
    };

    const calculateFunctionName = (method: any): string => {
        const args = method.inputs || [];
        const argNames = args.map((arg: any) => arg.name);
        return `${method.name}(${argNames.join(", ")})`;
    }

    const scSpecTypeToScVal = (type: string): string => {
        switch (type) {
            case xdr.ScSpecType.scSpecTypeAddress().name:
                return xdr.ScValType.scvAddress().name;
            case xdr.ScSpecType.scSpecTypeBool().name:
                return xdr.ScValType.scvBool().name;
            case xdr.ScSpecType.scSpecTypeBytes().name:
                return xdr.ScValType.scvBytes().name;
            case xdr.ScSpecType.scSpecTypeBytesN().name:
                return xdr.ScValType.scvBytes().name;
            case xdr.ScSpecType.scSpecTypeDuration().name:
                return xdr.ScValType.scvDuration().name;
            case xdr.ScSpecType.scSpecTypeI128().name:
                return xdr.ScValType.scvI128().name;
            case xdr.ScSpecType.scSpecTypeI256().name:
                return xdr.ScValType.scvI256().name;
            case xdr.ScSpecType.scSpecTypeI32().name:
                return xdr.ScValType.scvI32().name;
            case xdr.ScSpecType.scSpecTypeI64().name:
                return xdr.ScValType.scvI64().name;
            case xdr.ScSpecType.scSpecTypeMap().name:
                return xdr.ScValType.scvMap().name;
            case xdr.ScSpecType.scSpecTypeString().name:
                return xdr.ScValType.scvString().name;
            case xdr.ScSpecType.scSpecTypeSymbol().name:
                return xdr.ScValType.scvSymbol().name;
            case xdr.ScSpecType.scSpecTypeTimepoint().name:
                return xdr.ScValType.scvTimepoint().name;
            case xdr.ScSpecType.scSpecTypeU128().name:
                return xdr.ScValType.scvU128().name;
            case xdr.ScSpecType.scSpecTypeU256().name:
                return xdr.ScValType.scvU256().name;
            case xdr.ScSpecType.scSpecTypeU32().name:
                return xdr.ScValType.scvU32().name;
            case xdr.ScSpecType.scSpecTypeU64().name:
                return xdr.ScValType.scvU64().name;
            case xdr.ScSpecType.scSpecTypeVec().name:
                return xdr.ScValType.scvVec().name;
            // case xdr.ScSpecType.scSpecTypeVoid().name:
            //     return xdr.ScValType.scvVoid().name;
            default:
                return type;
            // return xdr.ScValType.scvString().name;
        }
    }

    return (
        <Accordion type="single" collapsible>
            {methods && methods.map((method: any, index: number) => {
                return (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="gilroy font-semibold">{calculateFunctionName(method)}</AccordionTrigger>
                        <AccordionContent>
                            {method.inputs.map((param: any, paramIndex: number) => {
                                return (
                                    <div key={paramIndex} className="">
                                        <h2>{param.name}</h2>

                                        <div className="grid grid-cols-12 gap-4 my-2">
                                            <div className="col-span-12 lg:col-span-10">
                                                <Input type={getInputType(param.type)}
                                                    className="" placeholder={scSpecTypeToScVal(param.type)}
                                                    onChange={(e) => handleChangeMethodData(method.name,
                                                        param.name,
                                                        scSpecTypeToScVal(param.type),
                                                        e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-12 lg:col-span-2">
                                                <Select
                                                    defaultValue={scSpecTypeToScVal(param.type)}
                                                    onValueChange={(e: any) => {
                                                        changeContractType(method.name,
                                                            param.name,
                                                            e)
                                                    }}
                                                >
                                                    <SelectTrigger className="">
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Type (Change if you need too!)</SelectLabel>
                                                            <ScrollArea className="h-[200px] rounded-md">
                                                                {scValTypes.map((scValType, index) => {
                                                                    return <SelectItem key={index} value={scValType}>{scValType}</SelectItem>
                                                                })}
                                                            </ScrollArea>
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            <Button disabled={isCallingMethod}
                                onClick={() => handleCallMethod(method.name)}
                            >
                                Call
                            </Button>

                            <div>
                                {(callData[method.name] && handleCallData(callData[method.name])) || ""}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                )
            })}
        </Accordion>
    )
}

const getDataType = (value: number): string => {
    const type = scValtypes.find(x => x.value === value);
    return (type && type.name) || xdr.ScValType.scvVoid().name;
}