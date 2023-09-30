export interface DeployerInformationProps
    extends React.HTMLAttributes<HTMLDivElement> {
    numberOfTransactions: number;
}

export const DeployerInformation = ({
    numberOfTransactions = 0
}: DeployerInformationProps) => {
    return (
        <div>
            Number of transaction
            {numberOfTransactions}
        </div>
    )
}