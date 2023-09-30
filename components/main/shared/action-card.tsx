import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { InlineIcon } from "@iconify/react/dist/iconify.js"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";


export interface ActionCardProps
    extends React.HTMLAttributes<HTMLDivElement> {
    item: ActionCardItem;
}

export const ActionCard = ({
    className,
    item
}: ActionCardProps) => {
    return (
        <Link href={item.href}>
            <Card className={cn("p-2", className)}>
                <CardHeader>
                    <InlineIcon icon={item.icon} className="my-2"
                        style={{
                            fontSize: "64px",
                            // fill: 'linear-gradient(#e66465, #9198e5)',
                            color: "#2948b1",
                            // backgroundImage: "linear-gradient(90deg,#1e3791 0%,#2948b1 40%,#3153c6 55%,#385fda 60%)",
                            // backgroundSize: "100%",
                            // WebkitBackgroundClip: "text",
                            // WebkitTextFillColor: "transparent",
                            // MozBackgroundClip: "text",
                            // MozTextFillColor: "transparent",
                        }}
                        fill={'linear-gradient(#e66465, #9198e5)'} />
                    <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>{item.description}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

export interface ActionCardItem {
    title: string;
    icon: string;
    description: string;
    href: string;
}