import Image from "next/image";
import Link from "next/link";

function HeaderLogo({ isMenu = false }: { isMenu?: boolean }) {
  const Component = isMenu ? "div" : Link;
  return (
    <Component
      href={"/"}
      className={`items-center ${isMenu ? "flex" : "hidden"}  lg:flex lg:gap-2`}
    >
      {!isMenu && (
        <Image src={"/logo.webp"} alt="Logo" width={28} height={28} />
      )}
      <span
        className={`${
          isMenu ? "text-purple-600" : "text-white"
        } font-bold text-2xl`}
      >
        Moneyverse
      </span>
    </Component>
  );
}

export default HeaderLogo;
