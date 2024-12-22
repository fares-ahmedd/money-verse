import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import WelcomeMsg from "./WelcomeMsg";
function Header() {
  return (
    <header className="bg-gr-main-4 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton
              afterSwitchSessionUrl="/"
              appearance={{
                elements: {
                  avatarBox: "size-12 border-2 border-white  ", // Styles the avatar (image container)
                },
              }}
            />
          </ClerkLoaded>
          <ClerkLoading>
            <div className="size-12 rounded-full bg-gr-main-2 shadow-lg animate-pulse " />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
}

export default Header;
