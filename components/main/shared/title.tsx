import { cn } from "@/lib/utils";

export interface TitleProps
    extends React.HTMLAttributes<HTMLHeadElement> {
}

export const Title = ({ children, className, ...props }: TitleProps) => {
    return (
        <h1 className={cn("text-4xl leading-[1.1] my-16", className)}
            {...props}>
            {children}
        </h1>
    )
}

