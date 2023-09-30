import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { InlineIcon } from "@iconify/react";
import Link from "next/link";

export interface HoverInformationProps
    extends React.HTMLAttributes<HTMLDivElement> {
    // description: string;
    iconSize?: string;
}

export const HoverInformation = ({
    className,
    children,
    // description,
    iconSize = "20px"
}: HoverInformationProps) => {
    return (
        <HoverCard>
            <HoverCardTrigger className={cn("cursor-pointer", className)}>
                <InlineIcon icon="material-symbols:info-outline" style={{ fontSize: iconSize }} />
            </HoverCardTrigger>
            <HoverCardContent>
                {children}
            </HoverCardContent>
        </HoverCard>
    )
}

