export const code = `
// Component.tsx
import { useSorosanSDK } from '@sorosan-client/react';

export const Component = () => {
    const { sdk } = useSorosanSDK();
    const [contract, setContract] = useState<string>("");

    const handleTokenInfo = async () => {
        const name: string = await sdk.token.name(contract);
        const symbol: string = await sdk.token.symbol(contract);
    
        console.log(name, symbol);
    }

    return (
        <>
            <Input onChange={(e) => setContract(e.target.value)} />
            <Button disabled={!sdk.util.isContractAddress(contract)}
                onClick={handleTokenInfo}>
                Try it out
            </Button>
        </>
    )
}
`.trim();