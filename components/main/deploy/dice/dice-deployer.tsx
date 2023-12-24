import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { useToast } from "@/components/ui/use-toast";
import { DEPLOYER_WASM_ID } from "@/lib/constants";
import { DeploymentInfoItem } from "@/components/main/deploy/deployment-information";

export interface DiceDeployerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setInfo: React.Dispatch<React.SetStateAction<DeploymentInfoItem[]>>;
    deployWasm: boolean;
}

export const DiceDeployer = ({
    setInfo,
    deployWasm,
}: DiceDeployerProps) => {
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
        let description = "Please connect wallet to deploy deployer";
        if (!await sdk.login()) {
            toast({ title, description });
            return;
        }

        let wasmId = DEPLOYER_WASM_ID(sdk.selectedNetwork.network);
        if (deployWasm) {
            title = "Deploying Wasm";
            description = "Deploying wasm to the network";
            toast({ title, description });

            const response = await fetch(`/api/wasm/dice`, {
                method: 'POST',
            });
            const wasm = await response.blob();
            if (!wasm) {
                return;
            }
            try {
                wasmId = await sdk.contract.deployWasm(wasm, sdk.publicKey);
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
        title = "Deploying Dice";
        description = "Deploying Dice to the network";
        toast({ title, description });

        const contractId = await sdk.contract.deploy(wasmId, sdk.publicKey);
        const contractAddress = await sdk.util.toContractAddress(contractId);

        if (!contractAddress) {
            title = "Deploy Failed";
            description = "Please try again";
            toast({ title, description });
            return;
        }

        title = "Deployed";
        description = "Your Dice contract has been deployed";
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