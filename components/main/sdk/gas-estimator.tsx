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

        const contractHash = "32d6700080a0fa40d1fe98817dafb1f211ba0ac8690dda745a0605bacc71b5b5";
        // contract address should be CAZNM4AAQCQPUQGR72MIC7NPWHZBDOQKZBUQ3WTULIDALOWMOG23L6JT
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
        setEstimatedGas(gasBigNumber.toNumber().toString());
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
