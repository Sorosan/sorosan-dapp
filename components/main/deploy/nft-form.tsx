import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { WASMCheckBox } from "./shared/wasm-checkbox";
import { HoverInformation } from "../shared/hover-information";
import { FormSubInfo } from "./shared/form-subinfo";

export interface NFTFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setWASMDeploy: Function;
    setTokenName: Function;
    setTokenSymbol: Function;
}

export const NFTForm = ({
    setWASMDeploy,
    setTokenName,
    setTokenSymbol,
}: NFTFormProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Contract Parameters</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid w-full items-center gap-4">
                    <FormSubInfo title="Deploy WASM File">
                        <div>
                            This is optional. Checking this will deploy the token
                            WASM file to the Soroban and require an additional
                            transaction signing. If not, then it&#39;ll use the latest
                            Token WASM file deployed on the network. 
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <WASMCheckBox className="my-4" placeholder="Token Name"
                            setDeployWasm={setWASMDeploy}
                        />
                    </div>

                    <FormSubInfo title="Token Name">
                        <div>
                            Filling this section will initialise the contract
                            with the given token name, symbol and decimal and will require
                            an additional transaction signing.
                        </div>
                    </FormSubInfo>
                    <div className="flex flex-col space-y-1.5">
                        <h2 className="text-normal">Token Name</h2>
                        <Input required={true} className="my-4" placeholder="Token Name"
                            onChange={(e) => setTokenName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <h2>Token Symbol</h2>
                        <Input required={true} className="my-4" placeholder="Token Symbol"
                            onChange={(e) => setTokenSymbol(e.target.value)}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}