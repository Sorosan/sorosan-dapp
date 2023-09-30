import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { InlineIcon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export interface Feature {
    title: string;
    icon?: string;
    description: string;
    action?: string;
    link?: string;
}

export interface FeaturesProps
    extends React.HTMLAttributes<HTMLDivElement> {
    feature: Feature;
}

export const Features = ({ feature, className }: FeaturesProps) => {
    return (
        <Card className={cn("", className)}>
            <CardHeader>
                {feature.icon &&
                    <InlineIcon className="my-2" style={{ fontSize: "64px" }} icon={feature.icon} />}
                <CardTitle className="gradient-text">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{feature.description}</p>
            </CardContent>
            <CardFooter>
                {feature.link &&
                    <Link className="flex justify-center items-center gilroy font-bold"
                        href={feature.link} rel="noopener noreferrer" target="_blank">
                        {feature.action ? feature.action : "Learn more"}
                        <InlineIcon style={{ fontSize: "24px"  }} icon="icon-park:right" />
                    </Link>}
            </CardFooter>
        </Card>
    )
}

