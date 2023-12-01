import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast";
import { useSorosanSDK } from "@sorosan-client/react";
import { useEffect, useState } from "react";
import { getPublicKey } from "@stellar/freighter-api";

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
            // const connected = await sdk.connectWallet();
            const publicKey = await getPublicKey();
            if (!publicKey) {
                toast({
                    title: "Not Connected",
                    description: "Please try again and make sure you have Freighter installed"
                });
            }

            const address = await sdk.publicKey || publicKey;
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
