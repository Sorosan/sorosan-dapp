"use client"

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Asset } from "stellar-sdk";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";
import { Input } from "@/components/ui/input";

const item: PageHeaderItem = {
    name: "Smart Contract Token to Stellar Asset",
    description: "Given a Token smart contract, get the Stellar Asset (if wrapped) (Not this is only available for Soroban Testnet)",
}

export default function ContractToAddress() {
    const { sdk } = useSorosanSDK();

    const [contractAddress, setSontractAddress] = useState<string>("");
    const [asset, setAsset] = useState<Asset | null>(null);

    const getAssetInfo = async () => {
        const asset = await sdk.token.getAssetFromContract(contractAddress);
        asset && setAsset(asset);
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={item} />

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-12">
                    <h2>Contract</h2>
                    <Input onChange={(e) => setSontractAddress(e.target.value)}
                        placeholder="C324DFH4..." />
                </div>
            </div>

            <Button className="my-4" onClick={getAssetInfo}>
                Get Contract Detail
            </Button>

            <div>
                {asset
                    ? <div>
                        <div className="flex justify-between">
                            <div className="text-gray-500">Code</div>
                            <div>{asset.getCode()}</div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-gray-500">Token Issuer</div>
                            <div>{asset.getIssuer()}</div>
                        </div>

                    </div>
                    : <div>Token may not be Wrapper to Stellar Asset</div>
                }
            </div>
        </div>
    )
}