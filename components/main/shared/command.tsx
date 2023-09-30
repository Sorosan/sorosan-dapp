import { ClipBoard } from "@/components/main/shared/clip-board";

export interface CommandProps
    extends React.HTMLAttributes<HTMLDivElement> {
    command: string;
}

export const Command = ({ command }: CommandProps) => {
    return (
        <div className="border border-black dark:border-white py-4 px-4 
            rounded-2xl flex items-center justify-between">
            <div className="font-mono">{command}</div>
            <ClipBoard className="" command={command} style={{ fontSize: "24px" }} />
        </div>
    )
}
