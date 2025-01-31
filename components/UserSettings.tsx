import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

function UserSettings() {
  return (
    <>
      <ClerkLoaded>
        <UserButton
          afterSwitchSessionUrl="/"
          appearance={{
            elements: {
              avatarBox: "size-12 border-2 border-white",
            },
          }}
        />
      </ClerkLoaded>
      <ClerkLoading>
        <div className="size-12 rounded-full bg-gr-main-2 shadow-lg animate-pulse " />
      </ClerkLoading>{" "}
    </>
  );
}

export default UserSettings;
