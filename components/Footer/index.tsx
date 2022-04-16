import Link from "next/link";

interface FooterProps {
  isLarge?: Boolean;
}

export default function Footer({ isLarge }: FooterProps) {
  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 h-[5em] border-t-[1px] border-solid border-[#E8EDF2] dark:border-[#313442] flex flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <p className="text-[12px] text-[#9A9AAF]">
          © 2022 - <span className="text-[#7364DB]">Fox</span> Dashboard
        </p>
        <div className="h-[5px] w-[5px] bg-[#7364DB] rounded-2xl"></div>
        <p className="text-[12px] text-[#9A9AAF]">
          Made by <span className="text-[#7364DB]">AliThemes</span>
        </p>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Link href="/">
          <a className="text-[12px] text-[#9A9AAF]">About</a>
        </Link>
        <Link href="/">
          <a className="text-[12px] text-[#9A9AAF]">Careers</a>
        </Link>
        <Link href="/">
          <a className="text-[12px] text-[#9A9AAF]">Policy</a>
        </Link>
        <Link href="/">
          <a className="text-[12px] text-[#9A9AAF]">Contact</a>
        </Link>
      </div>
    </div>
  );
}
