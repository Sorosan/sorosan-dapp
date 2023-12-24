import { SOROSAN_DOC_URL, SOROSAN_GITHUB_URL } from "@/lib/constants"

const items = [
    {
        title: "Github",
        href: SOROSAN_GITHUB_URL,
    },
    {
        title: "Discord",
        href: "/",
    },
    {
        title: "Docs",
        href: SOROSAN_DOC_URL,
    }
]
export interface FooterProps
    extends React.HTMLAttributes<HTMLDivElement> {
}

export const Footer = ({ }: FooterProps) => {
    return (
        <footer className="bg-white dark:bg-zinc-900 gilroy">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    © 2023 Sorosan
                </span>
                <ul className="flex items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    {items.map((item, index) => {
                        return (
                            <li key={index}>
                                <a href={item.href} className="mr-4 hover:underline md:mr-6 ">{item.title}</a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </footer>
    )
}