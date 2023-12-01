
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Feature, Features } from "../shared/features"
import { Title } from "@/components/main/shared/title"
import { InlineIcon } from "@iconify/react/dist/iconify.js"
import { Command } from "../shared/command"
import { motion } from "framer-motion"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { useAnimation } from "framer-motion"

export interface GettingStartedProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const GettingStarted = ({ }: GettingStartedProps) => {

    const animation = useAnimation();
    const [ref, inView] = useInView({
        threshold: 0.75,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            animation.start({
                y: 0, opacity: 1,
                transition: { type: "spring", duration: 1, bounce: 0.3 }
            });
        } else {
            animation.start({ y: "100vh", opacity: 0 });
        }
    }, [animation, inView]);
    return (
        <div className="mx-auto py-16 container" ref={ref}>
            <Title>Getting Started</Title>
            <div className="grid grid-cols-12 gap-8">
                {packages.map((pkg, index) => {
                    return (
                        <motion.div key={index} className="col-span-12 md:col-span-6"
                            animate={animation}>
                            <PackageComponent key={index} pkg={pkg} />
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

const PackageComponent = ({ pkg }: { pkg: NPMPackage }) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2 justify-center">
                    <InlineIcon className="cursor-pointer" style={{ fontSize: "24px" }}
                        icon={pkg.icon} />
                    <CardTitle className="text-center py-4">{pkg.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <Command command={pkg.command} />
            </CardContent>
        </Card>
    )
}

export interface NPMPackage {
    title: string;
    icon: string;
    command: string;
}

const packages: NPMPackage[] = [
    {
        title: 'Javascript',
        icon: 'logos:javascript',
        command: "npm install @sorosan-sdk/core",
    },
    {
        title: 'React',
        icon: 'logos:react',
        command: "npm install @sorosan-client/react",
    },
]