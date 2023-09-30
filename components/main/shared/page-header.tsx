import dynamic from 'next/dynamic'
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { InlineIcon } from '@iconify/react/dist/iconify.js';
import { Title } from '@/components/main/shared/title';

/**
 * Note: These information are currently hardcoded. As Sorosan expanded, we will
 * need to find a way to dynamically generate these information from a database.
 */
export interface PageHeaderItem {
    name: string;
    source?: string;
    version?: string;
    publisher?: string;
    date?: string;
    description: string;
}

interface PageHeaderProps
    extends React.InputHTMLAttributes<HTMLDivElement> {
    item: PageHeaderItem;
}

export const PageHeader = ({
    item,
    className,
    ...props
}: PageHeaderProps) => {
    return (
        <div className={cn("my-8", className)} {...props}>
            <Title className="flex items-center m-0">
                {item.name}
                {item.source &&
                    <Link className="hover:text-blue-700 mx-4 text-3xl"
                        href={item.source} rel="noopener noreferrer" target="_blank">
                        <InlineIcon icon="mingcute:github-line" className="align-middle" />
                    </Link>}
            </Title>
            {item.publisher &&
                <div><b>Publisher:{" "}</b>{item.publisher}</div>}
            <div>
                {item.description}
            </div>
        </div>
    );
};
