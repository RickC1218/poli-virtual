import Link from "next/link";
import Image from "next/image";

import NavLinks from "./nav-links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "./icons/icons";

export default function SideNav() {
  return (
    <div className=" mx-auto grid grid-cols-6 gap-4 items-center justify-center py-2.5 px-2 xl:px-9">
      <div className="col-span-1">
        <Link
          href="/">
          <div className="items-center flex justify-center">
            <Image
              src="/logo.png"
              width={141.06}
              height={100}
              alt="Poli Virtual Logo"
            />
          </div>
        </Link>
      </div>
      <div className="items-start hidden lg:block lg:col-span-2">
        <div className="flex justify-start">
          <div className="rounded-l-[10px] bg-[--white] border border-[--light-gray] p-2 hover:border-[--medium-gray] hover:cursor-pointer self-center">
            <FontAwesomeIcon
              icon={icons.faSearch}
              className="text-[--medium-gray] w-[16px] m-1"
            />
          </div>
          <input 
          type="text"
          className="bg-[--light] rounded-r-[10px] p-2 text-sm w-full"/>
        </div>
      </div>
      <div className="text-[--gray] col-span-5 lg:col-span-3 w-full">
        <div className="flex justify-end lg:justify-center">
          <NavLinks />
        </div>
      </div>
    </div>
  )
}