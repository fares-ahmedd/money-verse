import Image from "next/image";
import Link from "next/link";

function HeaderLogo({ open = false }: { open?: boolean }) {
  return (
    <Link
      href={"/"}
      className={`items-center ${open ? "flex" : "hidden"}  lg:flex lg:gap-2`}
    >
      {!open && <Image src={"/logo.webp"} alt="Logo" width={28} height={28} />}
      <span
        className={`${
          open ? "text-purple-600" : "text-white"
        } font-bold text-2xl`}
      >
        Moneyverse
      </span>
    </Link>
  );
}

export default HeaderLogo;
