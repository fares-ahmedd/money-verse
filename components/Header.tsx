import { Suspense } from "react";
import Filters from "./Filters";
import HeaderLogo from "./HeaderLogo";
import Navigation from "./Navigation";
import UserSettings from "./UserSettings";
import WelcomeMsg from "./WelcomeMsg";
import { Loader2 } from "lucide-react";
function Header() {
  return (
    <header className="bg-gr-main-3 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserSettings />
        </div>
        <WelcomeMsg />

        <Suspense
          fallback={
            <div className="my-2 ml-28">
              <Loader2 className="animate-spin  size-6 text-white" />
            </div>
          }
        >
          <Filters />
        </Suspense>
      </div>
    </header>
  );
}

export default Header;
