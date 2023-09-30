import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
// Need to import hexToByte
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
        abi.forEach((method: any) => {
            const hasReturn = method.outputs?.length > 0;

            hasReturn && setCallMethod((old: string[]) => [...old, method.name]);

            methodData[method.name] = {};
            method.params.forEach((param: any) => {
                methodData[method.name][param.name] = {
                    type: param.type,
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
        const params: xdr.ScVal[] = Object.keys(methodData[method] || []).map(key =>
            sdk.nativeToScVal(methodData[method][key].value, methodData[method][key].type.toLowerCase())
        );

        let title = "Transaction successful";
        let description = "Transaction signed and sent to the network.";
        console.log("calling method", method, params);
        if (callMethod.includes(method)) {
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
            case "address":
                return "text";
            case "i128":
            case "u32":
                return "number";
            case "bool":
                return "checkbox";
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
                    return JSON.stringify(data);
            default:
                return data.toString();
        }
    }
    const scValTypes: string[] = [
        "scvBool",
        "scvU32",
        "scvI32",
        "scvU64",
        "scvI64",
        "scvTimepoint",
        "scvDuration",
        "scvU128",
        "scvI128",
        "scvU256",
        "scvI256",
        "scvBytes",
        "scvString",
        "scvSymbol",
        "scvVec",
        "scvMap",
        "scvAddress",
        "scvContractInstance",
        // "scvVoid",
        // "scvError",
        // "scvLedgerKeyContractInstance",
        // "scvLedgerKeyNonce"
    ];

    /**
     * Updates the type of a parameter in a contract's ABI and method data.
     *
     * @param {string} name - The name of the method in the ABI.
     * @param {string} param - The name of the parameter to update.
     * @param {string} newType - The new type for the parameter.
     */
    const changeContractType = (name: string, param: string, newType: string) => {
        // Create a copy of the ABI array to avoid mutating the original ABI.
        const abiCopy = [...abi];

        // Find the index of the method with the specified name in the ABI.
        const methodIndex = abiCopy.findIndex(x => x.name === name);
        if (methodIndex < 0) return;
        const paramIndex = abiCopy[methodIndex].params.findIndex((x: any) => x.name === param);
        if (paramIndex < 0) return;

        // Update the type of the parameter in the ABI.
        abiCopy[methodIndex].params[paramIndex].type = newType;

        // Create a copy of the methodData and update
        const methodDataCopy = { ...methodData };
        methodDataCopy[name][param].type = newType;

        // Set the state
        setMethodData(methodDataCopy);
        setMethods(abiCopy);
    };

    const calculateFunctionName = (method: any): string => {
        const args = method.params || [];
        const argNames = args.map((arg: any) => arg.name);
        return `${method.name}(${argNames.join(", ")})`;
    }
    return (
        <Accordion type="single" collapsible>
            {methods && methods.map((method: any, index: number) => {
                return (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="gilroy font-semibold">{calculateFunctionName(method)}</AccordionTrigger>
                        <AccordionContent>
                            {method.params.map((param: any, paramIndex: number) => {
                                return (
                                    <div key={paramIndex} className="">
                                        <h2>{param.name}</h2>

                                        <div className="grid grid-cols-12 gap-4 my-2">
                                            <div className="col-span-12 lg:col-span-10">
                                                <Input type={getInputType(param.type)}
                                                    className="" placeholder={param.type}
                                                    onChange={(e) => handleChangeMethodData(method.name,
                                                        param.name,
                                                        param.type,
                                                        e.target.value)}
                                                />
                                            </div>
                                            <div className="col-span-12 lg:col-span-2">
                                                <Select
                                                    defaultValue={param.type}
                                                    onValueChange={(e) => {
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

export const transformABI = (abi: any): any[] => {
    const methods: any[] = abi
    .map((spec: any) => {
        const params = spec.params
        return {
            name: spec.name,
            params: params.map((param: any) => ({
                name: param.name,
                type: getDataType(param.type),
            })),
            outputs: spec.outputs,
        };
    });

    return methods
}

const getDataType = (value: number): string => {
    const type = scValtypes.find(x => x.value === value);
    return (type && type.name) || xdr.ScValType.scvVoid().name;
}