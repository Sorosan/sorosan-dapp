import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { useToast } from "@/components/ui/use-toast";
import { NFT_WASM_ID } from "@/lib/constants";
import { DeploymentInfoItem } from "./deployment-information";

export interface NFTDeployerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setInfo: React.Dispatch<React.SetStateAction<DeploymentInfoItem[]>>;
    deployWasm: boolean;
    name: string;
    symbol: string;
}

export const NFTDeployer = ({
    setInfo,
    deployWasm,
    name,
    symbol,
}: NFTDeployerProps) => {
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

        let wasmId = NFT_WASM_ID(sdk.selectedNetwork.network);
        if (deployWasm) {
            title = "Deploying Wasm";
            description = "Deploying wasm to the network";
            toast({ title, description });

            const response = await fetch(`/api/wasm/nft`, {
                method: 'POST',
            });
            const wasm = await response.blob();
            if (!wasm) {
                return;
            }
            try {
                const { payload } = await sdk.contract.deployWasm(wasm, sdk.publicKey);
                wasmId = payload;
            } catch (error) {
                console.log(error);
                wasmId = ""
            }
        }

        if (!wasmId) {
            title = "Wasm Deploy Failed";
            description = "Please try again or untick deploy wasm to use deployed wasm";
            toast({ title, description });
            return;
        }

        handleInfo("WASM", wasmId);
        title = "Deploying Token";
        description = "Deploying token to the network";
        toast({ title, description });

        const { payload: contractId } = await sdk.contract.deploy(wasmId, sdk.publicKey);
        const contractAddress = await sdk.util.toContractAddress(contractId);

        if (name && symbol) {
            title = "Initialising Token";
            description = "Deploying token to the network";
            toast({ title, description });
            const ret = await sdk.contract.initialise(contractAddress,
                "initialize", [
                sdk.util.addressScVal(sdk.publicKey),
                sdk.nativeToScVal(name),
                sdk.nativeToScVal(symbol),
            ]);

            if (!ret) {
                title = "Deployed but Initialise Failed";
                description = "Please try again";
                toast({ title, description });
                return;
            }
        }

        if (!contractAddress) {
            title = "Deploy Failed";
            description = "Please try again";
            toast({ title, description });
            return;
        }

        title = "Deployed";
        description = "Your token has been deployed";
        handleInfo("Contract", contractAddress);
        toast({ title, description });
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
        <Button onClick={handleDeploy}
            disabled={loading}
        >
            Deploy
        </Button>
    )
}