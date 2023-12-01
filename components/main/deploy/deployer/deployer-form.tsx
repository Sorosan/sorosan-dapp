import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FormSubInfo } from "@/components/main/deploy/shared/form-subinfo"
import { WASMCheckBox } from "@/components/main/deploy/shared/wasm-checkbox"

export interface DeployerFormProps
    extends React.HTMLAttributes<HTMLDivElement> {
    setWASMDeploy: Function;
}

export const DeployerForm = ({
    setWASMDeploy
}: DeployerFormProps) => {
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
                </div>
            </CardContent>
        </Card>
    )
}