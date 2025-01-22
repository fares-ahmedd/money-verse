import { useOpenAccount } from "@/features/accounts/hooks/useOpenAccount";

type Props = {
  accountId: string;
  account: string;
};

function AccountColumn({ account, accountId }: Props) {
  const { onOpen: onOpenAccount } = useOpenAccount();

  const onClick = () => {
    onOpenAccount(accountId);
  };
  return (
    <span
      className="flex items-center cursor-pointer hover:underline"
      onClick={onClick}
      role="button"
    >
      {account}
    </span>
  );
}

export default AccountColumn;
