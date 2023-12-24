import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSorosanSDK } from '@sorosan-sdk/react';

interface TokenInfoProp
    extends React.HTMLAttributes<HTMLDivElement> { }

export const TokenInfo = ({ className, ...props }: TokenInfoProp) => {
    const { sdk } = useSorosanSDK();

    const [contract, setContract] = useState("CB6TIIO3NSBEXDOW6Q2HNX7P2VV3BFI5GXRVITW2NKRJISWP7YA6HXP2");
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [loading, setLoading] = useState(false);

    const handleTokenInfo = async () => {
        setTokenName("");
        setTokenSymbol("");
        setLoading(true)

        const name = await sdk.token.name(contract);
        const symbol = await sdk.token.symbol(contract);

        setLoading(false);
        setTokenName(name);
        setTokenSymbol(symbol);
    }

    return (
        <div className={cn("w-96", className)}>
            <Input className="my-2"
                onChange={(e) => setContract(e.target.value)}
                value={contract} />
            <Button disabled={!sdk.util.isContractAddress(contract) || loading}
                onClick={handleTokenInfo}>
                {loading ? "Getting Info ..." : "Try it out"}
            </Button>
            
            <h3 className="text-xl font-bold">Token Name: {tokenName}</h3>
            <h3 className="text-xl font-bold">Token Symbol: {tokenSymbol}</h3>
        </div>
    );
};
