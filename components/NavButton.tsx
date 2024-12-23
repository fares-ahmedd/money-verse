import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type NavButtonProps = {
  href: string;
  label: string;
  isActive?: boolean;
};

function NavButton({ isActive, href, label }: NavButtonProps) {
  return (
    <Button
      asChild
      variant={"outline"}
      size="sm"
      className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-white/30 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
        isActive ? "bg-white/40 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
}

export default NavButton;
