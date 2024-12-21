import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
export default function Page() {
  return (
    <main className="full-screen grid grid-cols-1 lg:grid-cols-2">
      <section className="h-full flex flex-col items-center justify-center px-4 gap-1 py-1 overflow-y-auto text-center">
        <h1 className="font-bold  text-2xl md:text-3xl text-muted-foreground text-[#2E2A47]">
          Welcome To Moneyverse
        </h1>

        <p>Sign up or Create account to get back to your dashboard</p>
        <ClerkLoaded>
          <SignUp path="/sign-up" />
        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="animate-spin text-muted-foreground  size-10 " />
        </ClerkLoading>
      </section>
      <section className="max-lg:hidden full-screen grid place-items-center  bg-gr-main-1">
        <Image src="/logo.webp" alt="Logo" width={120} height={120} />
      </section>
    </main>
  );
}
