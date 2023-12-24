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

        const contractHash = "7d3421db6c824b8dd6f43476dfefd56bb0951d35e3544eda6aa2944acffe01e3";
        // contract address should be CB6TIIO3NSBEXDOW6Q2HNX7P2VV3BFI5GXRVITW2NKRJISWP7YA6HXP2
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

        const gasBigNumber = sdk.toXLM(parseInt(estimatedGas));

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
