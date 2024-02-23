"use client"

import { getContract, hexToByte } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
// Need to import hexToByte
import { useToast } from "@/components/ui/use-toast";
import { DeploymentInfoItem, DeploymentInformation } from "@/components/main/deploy/deployment-information";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";
import { ContractInvoke } from "@/components/main/tool/contract-invoke";

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

        // { wasmId, wasmIdLedger }
        const contractData: any = await sdk.contract.contractInfo(contractAddress);
        if (!contractData || !contractData.wasmId) {
            toast({
                title: "Contract not found",
                description: "Contract not found",
            });
            return;
        };

        const { wasmId, ledgerSeq: wasmIdLedger } = contractData;
        setWasmId(wasmId.toString('hex'));
        handleInfo("WASM", wasmId.toString('hex'));
        handleInfo("Creation Block No.", wasmIdLedger);

        const contractId = await sdk.util.toContractHash(contractAddress);
        // try {
        //     const expirationKey = getContractHashExpirationKey(contractId);
        //     console.log(expirationKey);
        // } catch (e) {
        //     console.error(e);
        // }

        try {
            const onChainData = await getContract(contractId);
            onChainData.created_at && handleInfo("Created At", onChainData.created_at, false);
            onChainData.transactions_count && handleInfo("Total Transaction Count", onChainData.transactions_count.toString(), false);
            onChainData.create_transaction.source_account && handleInfo("Source Account", onChainData.create_transaction.source_account);
            handleInfo("Contract Id", contractId);
        } catch (e) {
            console.error(e);
        }

        const { code: wasmCode }: any = await sdk.contract.contractCodeByWasm(wasmId);
        if (wasmCode) {
            const wasmBytes = hexToByte(wasmCode)
            const wasmFile = new Blob([new Uint8Array(wasmBytes)])
            setWasmFile(wasmFile);
        };

        const abi = await sdk.contract.getContractABI(contractAddress);
        console.log(abi)
        if (!abi) return;

        setKey(key + 1);
        setABI(abi);
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
        </div>
    )
}
