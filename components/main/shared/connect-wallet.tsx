"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useSorosanSDK } from "@sorosan-sdk/react";
import { useEffect, useState } from "react";

export interface ConnectWalletProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const ConnectWallet = ({ }: ConnectWalletProps) => {
    const { sdk } = useSorosanSDK();
    const { toast } = useToast();

    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        (async () => {
            await sdk.login();  // Attempt to restore login 
            const address = await sdk.publicKey;
            setAddress(address);
        })();
    }, []);

    const handleConnect = async () => {
        try {
            const logged = await sdk.login();
            const connected = await sdk.connectWallet();
            if (!connected) {
                toast({
                    title: "Not Connected",
                    description: "Please try again and make sure you have Freighter installed"
                });
            }

            const address = await sdk.publicKey;
            console.log(address);
            setAddress(address);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Button onClick={handleConnect}>
            {address ? sdk.util.mask(address) : "Connect Wallet"}
        </Button>
    )
}
