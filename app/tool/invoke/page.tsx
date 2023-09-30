"use client"

import { getContract, hexToByte, scValtypes } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { xdr } from "soroban-client";
import { useSorosanSDK } from "@sorosan-sdk/react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
// Need to import hexToByte
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";
import { ContractInvoke, transformABI } from "@/components/main/tool/contract-invoke";

const item: PageHeaderItem = {
    name: "Invoke",
    description: "Invoke a contract",
}
export default function InvokePage() {
    const { toast } = useToast();
    const { sdk } = useSorosanSDK();

    const [key, setKey] = useState<number>(0);
    const [contractAddress, setContractAddress] = useState<string>("");

    const [abi, setABI] = useState<any[]>([]);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);

    const [wasmId, setWasmId] = useState<string>("");
    const [wasmFile, setWasmFile] = useState<Blob | null>(null);

    /**
     * Given a contract id or address, return the contract address
     * @param str 
     * @returns 
     */
    const getContractAddress = async (val: string): Promise<string> => {
        if (sdk.contract.isContractHash(val)) {
            try {
                return await sdk.util.toContractAddress(val);
            } catch (error) {
                return "";
            }
        }
        return val;
    }

    const handleContractLoad = async (input: string) => {
        setABI([]);
        setInfo([]);

        const contractAddress: string = await getContractAddress(input);
        setContractAddress(contractAddress);

        const { wasmId, wasmIdLedger }: any = await sdk.contract.getContractData(contractAddress);
        if (!wasmId) {
            toast({
                title: "Contract not found",
                description: "Contract not found",
            });
            return;
        };

        setWasmId(wasmId.toString('hex'));
        handleInfo("WASM", wasmId.toString('hex'));
        handleInfo("Creation Block No.", wasmIdLedger);

        const contractId = await sdk.util.toContractHash(contractAddress);
        try {
            const onChainData = await getContract(contractId);
            onChainData.created_at && handleInfo("Created At", onChainData.created_at, false);
            onChainData.transactions_count && handleInfo("Total Transaction Count", onChainData.transactions_count.toString(), false);
            onChainData.create_transaction.source_account && handleInfo("Source Account", onChainData.create_transaction.source_account);
            handleInfo("Contract Id", contractId);
        } catch (e) {
            console.error(e);
        }

        const { wasmCode }: any = await sdk.contract.getContractCode(wasmId);
        if (wasmCode) {
            const wasmBytes = hexToByte(wasmCode)
            const wasmFile = new Blob([new Uint8Array(wasmBytes)])
            setWasmFile(wasmFile);
        };

        const abi = await sdk.contract.getContractABI(contractAddress);
        if (!abi) return;

        const methods: any[] = transformABI(abi);
        setKey(key + 1);
        setABI(methods);

        // scValtypes.forEach((type: any) => {
        //     console.log(type.name, type.value);
        // });
    }

    const downloadWasm = () => {
        toast({
            title: "Downloading",
            description: "Downloading wasm file",
        });
        if (!wasmFile) return;
        const url = window.URL.createObjectURL(wasmFile);

        var link = document.createElement("a"); // Or maybe get it from the current document
        link.href = url;
        link.download = "soroban_contract.wasm";
        link.click();
    }

    const handleInfo = (title: string, str: string, masked?: boolean) => {
        if (masked == undefined) { masked = true; }
        setInfo((old: DeploymentInfoItem[]) => [...old, {
            title: title,
            value: str,
            masked: masked,
        }])
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <h2>Contract</h2>
                    <Input onChange={(e) => handleContractLoad(e.target.value)}
                        placeholder="43c83307b..." />
                </div>
            </div>

            <DeploymentInformation information={info}
                numberOfTransaction={0}
                btn={wasmId
                    ? <Button onClick={downloadWasm}>Download WASM</Button>
                    : <></>
                } />

            {(abi && contractAddress) &&
                <ContractInvoke
                    key={key}
                    contractAddress={contractAddress}
                    abi={abi} />}

            {/* <Accordion type="single" collapsible>
                {abi && abi.map((method, index) => {
                    return (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{method.name}()</AccordionTrigger>
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
            </Accordion> */}
        </div>
    )
}
