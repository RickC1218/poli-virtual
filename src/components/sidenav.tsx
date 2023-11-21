import Link from "next/link";
import Image from "next/image";

import NavLinks from "./nav-links";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "./icons/icons";
import Button from "./buttons/buttons";

export default function SideNav() {
  const loginLink = {
    href: "/login",
    name: "Iniciar sesión",
    label: "Iniciar sesión",
  };
  const registerLink = {
    href: "/signin",
    name: "Registrarse",
    label: "Registrarse",
  };
  return (
    <div className=" mx-auto grid grid-cols-6 gap-2 items-center justify-center py-2.5 px-2 xl:px-9">
      <div className="col-span-1">
        <Link
          href="/common">
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
      <div className="items-start hidden col-span-2">
        <div className="flex justify-start">
          <div className="flex items-center rounded-l-[10px] bg-[--white] border border-[--high-gray] p-2 hover:border-[--medium-gray] hover:cursor-pointer self-center">
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
      <div className="text-[--gray] col-span-5 w-full flex justify-between">
        <div className="flex">
          <NavLinks />
        </div>
        <div className="flex" >
          <Link 
            key={loginLink.name}
            href={loginLink.href}
            className="block mx-2 md:flex-none"
            >
              <Button
                text={loginLink.name}
                icon={icons.faUser}
                color="blue"
                type="small"
              />
          </Link>
          <Link 
            key={registerLink.name}
            href={registerLink.href}
            className="block mx-2 md:flex-none"
            >
              <Button
                text={registerLink.name}
                icon={icons.faRightToBracket}
                color="red"
                type="small"
              />
          </Link>
        </div>
      </div>
    </div>
  )
}