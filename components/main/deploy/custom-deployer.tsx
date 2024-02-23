import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { useToast } from "@/components/ui/use-toast";
import { DeploymentInfoItem } from "./deployment-information";
import {
    Account,
    Address,
    Asset,
    Contract,
    Memo,
    Operation,
    SorobanRpc,
    TimeoutInfinite,
    Transaction,
    TransactionBuilder,
    xdr,
} from "stellar-sdk";

export interface ArgItem {
    name?: string;
    type: string;
    value: string;
}

export interface CustomDeployerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setInfo: React.Dispatch<React.SetStateAction<DeploymentInfoItem[]>>;
    wasm: File | undefined;
    initialiseMethod: string;
    initialiseArgs: ArgItem[];
}

export const CustomDeployer = ({
    setInfo,
    wasm,
    initialiseMethod,
    initialiseArgs
}: CustomDeployerProps) => {
    const { toast } = useToast();
    const { sdk } = useSorosanSDK();

    const [loading, setLoading] = useState<boolean>(false);

    const handleDeploy = async () => {
        setLoading(true);
        try {
            await deploy();
        } catch (error: any) {
            console.log(error);
            toast({ title: "Error", description: error.toString() });
        }
        setLoading(false);
    }

    const deploy = async () => {
        let title = "Not Logged In";
        let description = "Please connect wallet to deploy your token";
        if (!await sdk.login()) {
            toast({ title, description });
            return;
        }

        let args: any[] = [];
        try {
            args = initialiseArgs.map(arg => sdk.nativeToScVal(arg.value, arg.type));
        } catch (error) {
            console.log(error);
            title = "Invalid Arguments";
            description = "Please check your arguments are correct if initialising";
            toast({ title, description });
        }

        if (!wasm) {
            title = "No wasm file";
            description = "Please upload a wasm file to deploy";
            toast({ title, description });
            return;
        }

        setInfo([]);
        title = "Deploying Wasm";
        description = "Deploying wasm to the network";
        toast({ title, description });
        const { payload: wasmId } = await sdk.contract.deployWasm(wasm, sdk.publicKey);

        if (!wasmId) {
            title = "Wasm Deploy Failed";
            description = "Please check your wasm file is valid";
            toast({ title, description });
            return;
        }

        handleInfo("Wasm", wasmId);

        title = "Deploying Contract";
        description = "Deploying contract to the network";
        toast({ title, description });

        const { payload: contractId } = await sdk.contract.deploy(wasmId, sdk.publicKey);
        if (!contractId) {
            title = "Contract Deploy Failed";
            description = "Please try again";
            toast({ title, description });
            return;
        }

        const contractAddress = await sdk.util.toContractAddress(contractId);
        handleInfo("Contract", contractAddress);

        if (initialiseMethod) {
            title = "Initialising Contract";
            description = "Initialising contract to the network";
            toast({ title, description });

            const result = await sdk.send(contractAddress,
                initialiseMethod,
                args);

            if (result.status !== SorobanRpc.Api.GetTransactionStatus.SUCCESS) {
                title = "Initialise Failed";
                description = "Please try again";
                toast({ title, description });
                return;
            }
        }

        title = "Deployed";
        description = "Your contract has been deployed";
        toast({ title, description });
    }

    const handleInfo = (title: string, str: string) => {
        setInfo((old: DeploymentInfoItem[]) => [...old, {
            title: title,
            value: str,
        }])
    }

    return (
        <Button onClick={handleDeploy}
            disabled={!wasm || loading}
        >
            Deploy
        </Button>
    )
}