
import { InlineIcon } from "@iconify/react/dist/iconify.js"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"
import { motion, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";


export interface ClipBoardProps
    extends React.HTMLAttributes<HTMLDivElement> {
    command: string;
}

export const ClipBoard = ({
    className,
    command,
    style
}: ClipBoardProps) => {
    const [scope, animate] = useAnimate();

    const copyToClipboard = async () => {
        if (scope.current) {
            await animate("svg", { opacity: 0.32 }, { delay: 0.5 })
            navigator.clipboard.writeText(command);
            await animate("svg", { opacity: 1 })

        }
    }

    return (
        <div ref={scope}>
            <InlineIcon className={cn("icon float-right cursor-pointer", className)}
                style={{ fontSize: "24px", ...style }}
                icon="radix-icons:copy"
                onClick={copyToClipboard} />
        </div>
    )
}
