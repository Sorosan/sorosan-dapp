import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { useToast } from "@/components/ui/use-toast";
import { TOKEN_WASM_ID } from "@/lib/constants";
import { DeploymentInfoItem } from "./deployment-information";

export interface TokenDeployerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setInfo: React.Dispatch<React.SetStateAction<DeploymentInfoItem[]>>;
    deployWasm: boolean;
    name: string;
    symbol: string;
    decimal: number;
    issuer: string;
}

export const TokenDeployer = ({
    setInfo,
    deployWasm,
    name,
    symbol,
    decimal,
    issuer
}: TokenDeployerProps) => {
    const { toast } = useToast();
    const { sdk } = useSorosanSDK();

    const [loading, setLoading] = useState<boolean>(false);

    const handleDeploy = async () => {
        setLoading(true);
        try {
            await deploy();
        } catch (error) {
            console.log(error);
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

        let contractAddress: string = "";
        setInfo([]);
        if (issuer) {   // Wrap
            if (issuer === sdk.publicKey) {
                title = "Issuer cannot be the same as the your signing account";
                description = "Please try again";
                toast({ title, description });
                return;
            }

            try {
                const asset = await sdk.token.createAsset(symbol, issuer);
                if (!asset) {
                    throw new Error("Failed to create asset");
                }

                handleInfo("Asset", `${asset.getCode()}-${asset.getIssuer()}`);
                contractAddress = await sdk.token.wrap(asset);
            } catch (error: any) {
                title = "Asset Creation Failed";
                description = "Please try again";
                if (error.toString().includes("Exist")) {
                    title = "Asset Already Wrapped";
                    description = "Please try again";
                }
                toast({ title, description });
                return;
            }
        } else {    // Contract
            let wasmId = TOKEN_WASM_ID;
            if (deployWasm) {
                title = "Deploying Wasm";
                description = "Deploying wasm to the network";
                toast({ title, description });

                const response = await fetch(`/api/wasm/token`, {
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
            title = "Deploying Token";
            description = "Deploying token to the network";
            toast({ title, description });

            const contractId = await sdk.contract.deploy(wasmId, sdk.publicKey);
            contractAddress = await sdk.util.toContractAddress(contractId);

            if (name && symbol && (decimal > 0)) {
                title = "Initialising Token";
                description = "Deploying token to the network";
                toast({ title, description });
                // TODO sdk.token.initialise(contractAddress, name, symbol, decimal)
                const ret = await sdk.contract.initialise(contractAddress,
                    "initialize", [
                    sdk.util.addressScVal(sdk.publicKey),
                    sdk.nativeToScVal(decimal, "u32"),
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