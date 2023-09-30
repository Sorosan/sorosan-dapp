import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { WASMCheckBox } from "./shared/wasm-checkbox";

export interface TokenWrapFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setTokenSymbol: Function;
    setIssuer: Function;
}

export const TokenWrapForm = ({
    setTokenSymbol,
    setIssuer
}: TokenWrapFormProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contract Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <h2>Code</h2>
                        <Input required={true} className="my-4" placeholder="Token Symbol"
                            onChange={(e) => setTokenSymbol(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Issuer</h2>
                        <Input required={true} className="my-4" placeholder="Token Name"
                            onChange={(e) => setIssuer(e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}