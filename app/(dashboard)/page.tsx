import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-6">
      <p>This Is Auth Route</p>
      <UserButton afterSwitchSessionUrl="/">Logout</UserButton>
    </div>
  );
}
