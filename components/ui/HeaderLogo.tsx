import Image from "next/image";
import Link from "next/link";

function HeaderLogo() {
  return (
    <Link href={"/"} className="items-center hidden lg:flex lg:gap-2">
      {" "}
      <Image src="/logo.webp" alt="Logo" width={28} height={28} />
      <span className="text-white font-bold text-2xl">Moneyverse</span>
    </Link>
  );
}

export default HeaderLogo;
