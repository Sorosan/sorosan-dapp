import { useState } from "react";
import { HoverInformation } from "@/components/main/shared/hover-information";

export interface FormSubInfoProps
    extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
}

export const FormSubInfo = ({
    title,
    children
}: FormSubInfoProps) => {
    return (
        <div className="flex items-center gap-x-4">
            <h2 className="text-lg">{title}</h2>
            {children &&
                <HoverInformation>
                    {children}
                </HoverInformation>}
        </div>
    )
}
