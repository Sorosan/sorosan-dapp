"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";
import { useSorosanSDK } from "@sorosan-client/react";
import { Input } from "@/components/ui/input";

const item: PageHeaderItem = {
    name: "Contract Converter",
    description: "Convert contract address (or id / hash) to its contract hash and vice versa",
}

export default function ContractIdConversion() {
    const { sdk } = useSorosanSDK();

    const [input, setInput] = useState<string>("");
    const [output, setOutput] = useState<string>("");


    const handleContractAddress = async () => {
        try {
            const contractHash = await sdk.util.toContractHash(input);
            setOutput(contractHash);
        } catch (e: any) {
            setOutput(e.message);
        }
    }

    const handleContractHash = async () => {
        try {
            const contractAddress = await sdk.util.toContractAddress(input);

            setOutput(contractAddress);
        } catch (e: any) {
            setOutput(e.message);
        }
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <h2>Contract</h2>
                    <Input onChange={(e) => setInput(e.target.value)}
                        placeholder="43c83307b..." />
                </div>
            </div>

            <div className="space-x-2">
                <Button className="my-4" onClick={handleContractAddress}>
                    Get Contract Address
                </Button>

                <Button className="my-4" onClick={handleContractHash}>
                    Get Contract Hash
                </Button>
            </div>

            <div>
                Output: {output}
            </div>
        </div>
    )
}