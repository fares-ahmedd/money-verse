"use client";

import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

function WelcomeMsg() {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 my-2">
      <h2 className="text-2xl lg:text-4xl text-white font-bold">
        Welcome back
        {isLoaded ? (
          <>
            {", "}
            <span className="capitalize">{user?.firstName}</span>{" "}
          </>
        ) : (
          <>
            {", "}{" "}
            <Loader2 className="animate-spin inline-block mx-3 size-5 md:size-7" />
          </>
        )}
      </h2>
      <p className="text-sm lg:text-base text-[#eee]">
        Here&apos;s a summary of your financial performance.
      </p>
    </div>
  );
}

export default WelcomeMsg;
