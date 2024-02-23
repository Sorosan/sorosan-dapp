"use client"

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSorosanSDK } from '@sorosan-sdk/react';

interface GasEstimatorProp
    extends React.HTMLAttributes<HTMLDivElement> { }

export const GasEstimator = ({ className, ...props }: GasEstimatorProp) => {
    const { sdk } = useSorosanSDK();

    const [estimatedGas, setEstimatedGas] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEstimateGas = async () => {
        setLoading(true);

        const contractHash = "21abca7f13572afa1a607172bdbd269a9cb9025e7a1107de14754819dd997a57";
        // contract address should be CAQ2XST7CNLSV6Q2MBYXFPN5E2NJZOICLZ5BCB66CR2UQGO5TF5FOWAF
        const contractAddress = await sdk.util.toContractAddress(contractHash);

        // can convert native typescript type like boolean, string, number etc
        const args = [
            sdk.nativeToScVal("GCZIJ6IVR2GXZDRZUEXY72I6OC5MPYW4I2Q7CC332SNSE274SZFILR76", "address"),
            sdk.nativeToScVal(100, "i128"),
        ];
        const estimatedGas = await sdk.estimateGas(
            contractAddress,
            "mint",
            args
        )

        const gasBigNumber = sdk.util.toXLM(parseInt(estimatedGas));

        setLoading(false);
        setEstimatedGas(gasBigNumber.toNumber().toString() || "0.0194598");
    }

    return (
        <div className={cn("w-full", className)}>
            <Button onClick={handleEstimateGas} disabled={loading}>
                {loading ? "..." : "Try it out"}
            </Button>

            <h3 className="text-xl font-bold">Estimated Gas: {estimatedGas} XLM</h3>
        </div>
    );
};
