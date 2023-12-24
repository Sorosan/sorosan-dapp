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
    name: "Token Explorer",
    description: "Invoke a contract",
}
export default function TokenExplorerPage() {
    const { toast } = useToast();
    const { sdk } = useSorosanSDK();

    const [key, setKey] = useState<number>(0);
    const [contractAddress, setContractAddress] = useState<string>("");

    const [abi, setABI] = useState<any[]>([]);
    const [info, setInfo] = useState<DeploymentInfoItem[]>([]);
    const [tokenInfo, setTokenInfo] = useState<DeploymentInfoItem[]>([]);

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
        // setKey(key + 1);
        setInfo([]);
        setTokenInfo([]);

        const contractAddress: string = await getContractAddress(input);
        if (!contractAddress) return;
        setContractAddress(contractAddress);
        // console.log(contractAddress);

        let title = "Grabbing token information"
        let description = "Please wait ..."
        try {
            // Check if its a token by getting the token name and symbol
            const tokenName = await sdk.token.name(contractAddress);
            const tokenSymbol = await sdk.token.symbol(contractAddress);
            const tokenDecimal = await sdk.token.decimal(contractAddress);

            handleTokenInfo("Name", tokenName, false);
            handleTokenInfo("Symbol", tokenSymbol, false);
            handleTokenInfo("Decimal", tokenDecimal.toString(), false);
        } catch (e) {
            title = "Contract might not be a token"
            description = "Try another contract"
            toast({ title, description });
            return;
        }

        toast({ title, description });

        const contractId = await sdk.util.toContractHash(contractAddress)
        try {
            // const wrappedAsset = await sdk.token.getAsset(contractAddress);
            const onChainData = await getContract(contractId);
            onChainData.created_at && handleInfo("Created At", onChainData.created_at, false);
            onChainData.transactions_count && handleInfo("Total Transaction Count", onChainData.transactions_count.toString(), false);
            onChainData.create_transaction.source_account && handleInfo("Source Account", onChainData.create_transaction.source_account);
            handleInfo("Contract Id", contractId);
        } catch (e) {
            console.error(e);
        }

        // if (false /* wrappedAsset */) {
        //     // handleTokenInfo("Asset", `${wrappedAsset.getCode()}-${wrappedAsset.getIssuer()}`);
        // } else {
        //     // Handle the contract data since if not wrapped
        //     handleTokenInfo("Asset", "Contract not Wrapped", false);
        //     const { wasmId, wasmIdLedger }: any = await sdk.contract.getContractData(contractAddress);
        //     if (!wasmId) {
        //         title = "Contract not found"
        //         description = "Contract not found"
        //         toast({ title, description });
        //         return;
        //     };

        //     setWasmId(wasmId.toString('hex'));
        //     handleInfo("WASM", wasmId.toString('hex'));
        //     handleInfo("Creation Block No.", wasmIdLedger);

        //     const { wasmCode }: any = await sdk.contract.getContractCode(wasmId);
        //     if (wasmCode) {
        //         const wasmBytes = hexToByte(wasmCode)
        //         const wasmFile = new Blob([new Uint8Array(wasmBytes)])
        //         setWasmFile(wasmFile);
        //     };
        // }

        try {
            const { wasmId, wasmIdLedger }: any = await sdk.contract.getContractData(contractAddress);
            if (wasmId) {
                setWasmId(wasmId.toString('hex'));
                handleInfo("WASM", wasmId.toString('hex'));
                handleInfo("Creation Block No.", wasmIdLedger);
    
                const { wasmCode }: any = await sdk.contract.getContractCode(wasmId);
                if (wasmCode) {
                const wasmBytes = hexToByte(wasmCode)
                const wasmFile = new Blob([new Uint8Array(wasmBytes)])
                setWasmFile(wasmFile);
                };
                // title = "Contract not found"
                // description = "Contract not found"
                // toast({ title, description });
                // return;
            } else {
                handleTokenInfo("Asset", "Contract is Wrapped", false);
            }
        } catch (error: any) { 
            console.log(error);
        }
        const abi = await sdk.contract.getContractABI(contractAddress);
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

    const handleTokenInfo = (title: string, str: string, masked?: boolean) => {
        if (masked == undefined) { masked = true; }
        setTokenInfo((old: DeploymentInfoItem[]) => [...old, {
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

            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation information={info}
                        numberOfTransaction={0}
                        btn={wasmId
                            ? <Button onClick={downloadWasm}>Download WASM</Button>
                            : <></>
                        } />
                </div>
                <div className="col-span-12 md:col-span-6">
                    <DeploymentInformation
                        title={"Token Information"}
                        information={tokenInfo}
                        numberOfTransaction={0}
                        btn={<></>} />
                </div>
            </div>

            {(abi && contractAddress) &&
                <ContractInvoke
                    key={key}
                    contractAddress={contractAddress}
                    abi={abi} />}
        </div>
    )
}
