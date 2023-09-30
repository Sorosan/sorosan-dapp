"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { PageHeader, PageHeaderItem } from "@/components/main/shared/page-header";

const item: PageHeaderItem = {
    name: "Stellar Asset to Smart Contract Token",
    description: "Get a contract identifier from a given Stellar Asset.",
}

export default function AssetToContractPage() {
    const { sdk } = useSorosanSDK();
    const { toast } = useToast();

    const [code, setCode] = useState<string>("");
    const [issuer, setIssuer] = useState<string>("");

    const [contractId, setContractId] = useState<string>("");
    const [contractAddress, setContractAddress] = useState<string>("");

    const getContractDetail = async () => {
        const contractAddress = await sdk.token.getContractAddressFromAsset(code, issuer);
        const contractId = sdk.util.toContractHash(contractAddress);

        setContractId(contractId);
        setContractAddress(contractAddress);
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4">
                    <h2>Code</h2>
                    <Input onChange={(e) => setCode(e.target.value)}
                        placeholder="USDC" />
                </div>
                <div className="col-span-12 md:col-span-8">
                    <h2>Issuer</h2>
                    <Input onChange={(e) => setIssuer(e.target.value)}
                        placeholder="GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN" />
                </div>
            </div>

            <Button className="my-4" onClick={getContractDetail}>
                Get Contract Detail
            </Button>

            <div>
                <div>Contract Id: {contractId}</div>
                <div>Contract Address: {contractAddress}</div>
            </div>

            {/* <InputLabel>Use API</InputLabel>
            <Textarea value={`https://localhost:3000/api/tool/asset-to-contract?code=${code}&issuer=${issuer}&network=${"futurenet"}`}
                readOnly={true} /> */}
        </div>
    )
}