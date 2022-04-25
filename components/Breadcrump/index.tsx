import Image from "next/image";
import Link from "next/link";

interface Links {
  Name: string;
  Url: string;
  icon?: string;
}
interface BreadcrumpProps {
  Links: Links[];
}
export default function Breadcrump(props: BreadcrumpProps) {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {props.Links.map((link, index) => {
          const { Name, Url } = link;
          const isLast = index === props.Links.length - 1;

          if (!isLast) {
            return (
              <li className="inline-flex items-center cursor-pointer">
                <Link href={Url}>
                  <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-[#8B8B93] dark:hover:text-[#7364DB]">
                    {link.icon && (
                      <img
                        src={link.icon}
                        alt={link.Name}
                        width={16}
                        height={16}
                        className="mr-1 block"
                      />
                    )}
                    <p>
                      {Name}
                    </p>
                  </a>
                </Link>
                <img src="/svg/arrow-right-2.svg" alt="" className="block ml-1 mr-1" width={16} height={16} />
              </li>
            );
          } else {
            return (
              <li className="inline-flex items-center cursor-pointer">
                <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-[#7364DB]">
                  <>
                    {link.icon && (
                      <img
                        src={link.icon}
                        alt={link.Name}
                        width={16}
                        height={16}
                        className="mr-1 block"
                      />
                    )}
                    <p className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-[#7364DB] dark:hover:text-[#7364DB]">
                      {Name}
                    </p>
                  </>
                </a>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
}
