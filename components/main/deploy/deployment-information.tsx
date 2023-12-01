import { useSorosanSDK } from "@sorosan-client/react";
import { ClipBoard } from "../shared/clip-board";
import { Http2ServerRequest } from "http2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface DeploymentInfoItem {
    title: string;
    value: string;
    masked?: boolean;
}
export interface DeploymentInformationProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    numberOfTransaction: number;
    information: DeploymentInfoItem[];
    btn: JSX.Element;
}

export const DeploymentInformation = ({
    title,
    numberOfTransaction,
    information,
    btn
}: DeploymentInformationProps) => {
    return (
        <Card className="bg-transparent dark:bg-transparent">
            <CardHeader>
                <CardTitle>{title ? title : "Deployment Information"}</CardTitle>
            </CardHeader>
            <CardContent>
                {numberOfTransaction > 0 &&
                    <DeploymentInfo info={{
                        title: "No. of Transaction required",
                        value: numberOfTransaction.toString()
                    }} />}

                {information.map((info, index) => {
                    return (
                        <DeploymentInfo key={index} info={info} />
                    )
                })}

                {btn}
            </CardContent>
        </Card>
    )
}

interface DeploymentInfoProps
    extends React.HTMLAttributes<HTMLDivElement> {
    info: DeploymentInfoItem;
}

const DeploymentInfo = ({ info }: DeploymentInfoProps) => {
    const { sdk } = useSorosanSDK();

    return (
        <div className="my-1 flex items-center gap-x-4">
            <h5>
                {info.title}
            </h5>
            <div className="flex items-center gap-x-2 bg-slate-50 dark:bg-zinc-900 px-2.5 py-1 rounded-md">
                {info.masked ? sdk.util.mask(info.value) : info.value}
                <ClipBoard command={info.value} />
            </div>
        </div>
    )
}