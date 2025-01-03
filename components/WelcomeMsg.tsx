"use client";

import { useUser } from "@clerk/nextjs";

function WelcomeMsg() {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2">
      <h2 className="text-2xl lg:text-4xl text-white font-bold">
        Welcome back{isLoaded ? ", " : ""} {user?.firstName}
      </h2>
      <p className="text-sm lg:text-base text-[#eee]">
        Here&apos;s a summary of your financial performance.
      </p>
    </div>
  );
}

export default WelcomeMsg;
