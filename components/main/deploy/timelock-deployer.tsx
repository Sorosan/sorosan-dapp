import { Button } from "@/components/ui/button";
import { xdr } from "soroban-client";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-client/react";
import { useToast } from "@/components/ui/use-toast";
import { TIMELOCK_WASM_ID, TOKEN_WASM_ID } from "@/lib/constants";
import { DeploymentInfoItem } from "./deployment-information";

export interface TimelockDeployerProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setInfo: React.Dispatch<React.SetStateAction<DeploymentInfoItem[]>>;
    deployWasm: boolean;
    // Approve
    token: string;
    amount: number;
    // Initialise
    claimants: string[];
    timeBoundKind: 0 | 1;
    timeBoundTimestamp: number;
}

export const TimelockDeployer = ({
    setInfo,
    deployWasm,
    token,
    amount,
    claimants,
    timeBoundKind,
    timeBoundTimestamp
}: TimelockDeployerProps) => {
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

        setInfo([]);
        let wasmId = TIMELOCK_WASM_ID;
        // if (deployWasm) {
        //     title = "Deploying Wasm";
        //     description = "Deploying wasm to the network";
        //     toast({ title, description });

        //     const response = await fetch(`/api/wasm/timelock`, {
        //         method: 'POST',
        //     });
        //     const wasm = await response.blob();
        //     if (!wasm) {
        //         title = "Fail to fetch wasm";
        //         description = "Please try again or untick deploy wasm to use deployed wasm";
        //         toast({ title, description });
        //         return;
        //     }
        //     try {
        //         wasmId = await sdk.contract.deployWasm(wasm, sdk.publicKey);
        //         console.log(wasmId);
        //     } catch (error) {
        //         console.log(error);
        //         wasmId = ""
        //     }
        // }

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
        const contractAddress = await sdk.util.toContractAddress(contractId);
        console.log(contractAddress);

        if (!contractAddress) {
            title = "Deploy Failed";
            description = "Please try again";
            toast({ title, description });
            return;
        }

        if (sdk.util.isContractAddress(token) && amount) {
            let params: any[] = [];
            try {
                const response = await sdk.server.getLatestLedger();
                params = [
                    sdk.util.addressScVal(sdk.publicKey),
                    sdk.util.addressScVal(contractAddress),
                    sdk.nativeToScVal(parseInt(amount.toString()), "i128"),
                    // Get current expiration ledger and set based on that
                    sdk.nativeToScVal(response.sequence + 5000, "u32")
                ];
            } catch (e) {
                title = "Invalid amount";
                description = "Please enter a valid amount.";
                toast({ title, description });
                return;
            }

            title = "Approving Token";
            description = "Deploying token to the network";
            toast({ title, description });
            const success = await sdk.send(token, "approve", params);
            if (!success) {
                title = "Failed to approve";
                description = "Failed to approve";
                toast({ title, description });
                return;
            }
        }

        try {
            // Lazy way to check if the user has inputted the correct arguments
            const initialiseArgs = generateArgs();
            const isInitialised = await sdk.contract.initialise(
                contractAddress,
                "deposit",
                initialiseArgs
            );

            if (!isInitialised) {
                title = "Initialise Failed";
                description = "Please try again";
                toast({ title, description });
            }
        } catch (error) {
            // Fail here means the user has not inputted the correct arguments
            console.log(error);
        }
        handleInfo("Contract", contractAddress);
        title = "Deployed";
        description = "Your contract has been deployed";
        toast({ title, description });
    }

    const generateArgs = () => {
        // This method will be improved to use the sdk util
        const fromAddress = sdk.util.addressScVal(sdk.publicKey);
        const tokenAddress = sdk.util.addressScVal(token);
        const amountI128 = sdk.nativeToScVal(parseInt(amount.toString()), "i128");

        let claimantsAddresses: any[] = [];
        try {
            claimants.filter(claimant => claimant).forEach((claimant) => {
                claimantsAddresses.push(sdk.util.addressScVal(claimant));
            });
        } catch (e) {
            console.log(e);
            return [];
        }
        const claimantsVec = xdr.ScVal.scvVec(claimantsAddresses);

        // 1 - before, 0 - after
        const timeBoundInput = timeBoundKind;
        const timestampVal = timeBoundTimestamp;

        const timeBoundKindBefore = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("Before")]);
        const timeBoundKindAfter = xdr.ScVal.scvVec([xdr.ScVal.scvSymbol("After")]);

        let timeBoundkindVal = timeBoundKindBefore;
        if (timeBoundInput)
            timeBoundkindVal = timeBoundKindAfter;

        const timeBoundKindMap = new xdr.ScMapEntry({
            key: xdr.ScVal.scvSymbol("kind"),
            val: timeBoundkindVal,
        })
        const timeBoundTimestampVec = new xdr.ScMapEntry({
            key: xdr.ScVal.scvSymbol("timestamp"),
            val: xdr.ScVal.scvU64(new xdr.Uint64(timestampVal)),
        })
        const timebound = xdr.ScVal.scvMap([timeBoundKindMap, timeBoundTimestampVec]);

        const params = [
            fromAddress,
            tokenAddress,
            amountI128,
            claimantsVec,
            timebound,
        ];

        return params;
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