"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { PageHeaderItem, PageHeader } from "@/components/main/shared/page-header";

const info: PageHeaderItem = {
    name: "Friendbot: Stellar Testnet Account Funding",
    description: "Get 10,000 xlm for your testnet account once",
}

export default function ContractToAddress() {
    const { sdk } = useSorosanSDK();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [pubKey, setPubKey] = useState<string>("");
    const [useFreighter, setUseFreighter] = useState<boolean>(false);
    const [tipResult, setTipResult] = useState<any>(null);

    useEffect(() => {
        (async () => {
            setUseFreighter(await sdk.login());
        })();
    }, []);

    const fundAccount = async () => {
        setIsLoading(true);
        try {
            const result = await tipAccount(pubKey);
            setTipResult(result);
        } catch (error) {
            console.log(error);
            setTipResult(error);
        }
        setIsLoading(false);
    }

    const useWalletAccount = async () => {
        let userInfo = sdk.publicKey || "";
        setPubKey(userInfo);
    }

    return (
        <div className="container mx-auto">
            <PageHeader item={info} />

            <div className="flex w-full items-center space-x-2">
                <Input type="text"
                    placeholder="GDKIJJIKX..."
                    value={pubKey}
                    onChange={(e) => setPubKey(e.target.value)} />
                <Button disabled={!useFreighter} onClick={useWalletAccount}>
                    Use Wallet Account
                </Button>
            </div>

            <Button className="my-4" disabled={!sdk.util.isAddress(pubKey) || isLoading}
                onClick={fundAccount}>
                Get Contract Detail
            </Button>

            <div>
                API: {`https://friendbot-futurenet.stellar.org/?addr=${pubKey}`}
            </div>
            <div>
                {tipResult
                    ? <div>
                        {tipResult.result_xdr
                            ?
                            <div>
                                <div>Output:</div>
                                <div>Transaction Result: {"Success!"}</div>
                                <div>Transaction Hash: {tipResult.result_xdr}</div>
                            </div>
                            :
                            <div>
                                <div>Transaction Result: {tipResult.status}</div>
                                <div>Transaction Hash: {tipResult.detail}</div>
                            </div>}
                    </div>
                    : <></>}
            </div>
        </div>
    )
}

const tipAccount = async (
    address: string,
    friendbot: string = 'https://friendbot-futurenet.stellar.org'
) => {
    try {
        const response = await fetch(
            `${friendbot}/?addr=${encodeURIComponent(address)}`,
        );
        const data = await response.json();
        return data;
    } catch (e) {
        return null;
    }
}