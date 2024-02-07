"use client";

import Link from "next/link";
import Image from "next/image";

import NavLinks from "./NavLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import icons from "../icons/icons";
import Button from "../buttons/Button";

export default function SideNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // Verify localStorage to determine if there is an active session
    const isSessionActive = localStorage.getItem("token") !== null;
    setSessionActive(isSessionActive);
  }, []);

  // 
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const handleSearch = () => {
    if (searchValue.trim() !== "") {
      // Redirect to search page
      window.location.href = `/common/search?query=${searchValue}`;
    }
  }
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Evita que se dispare el evento `onKeyDown` cuando se suelta la tecla Enter
      event.preventDefault();
    }
  };

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
    <>
      {menuOpen && (
        <div role="button"
          className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 cursor-auto"
          onClick={closeMenu}
        />
      )}
      <div className="mx-auto grid grid-cols-6 gap-2 items-center justify-center py-2.5 px-2 xl:px-9 max-h-full z-10">
        <div className="col-span-1">
          <Link href="/common/explore">
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
        <div
          className={`text-[--gray] col-span-5 justify-end w-full flex lg:flex-none`}
        >
          <div className="flex lg:hidden items-center p-2">
            <button
              className="text-[--gray] focus:outline-none flex flex-col justify-items-center items-center hover:text-[--principal-red]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon
                icon={menuOpen ? icons.faCircleXmark : icons.faBars}
                className={`text-3xl ${menuOpen ? "z-10" : ""}`}
              />
            </button>
          </div>
          <div
            className={`flex lg:flex justify-between cursor-auto w-full ${
              menuOpen
                ? "flex-col space-x-2 absolute bg-[--white] py-4 border border-[--high-gray] rounded-3xl w-full sm:w-[50%] lg:w-[25%] z-10"
                : "hidden"
            }`}
          >
            <div
              suppressHydrationWarning={true}
              className={`items-center ${
                sessionActive ? "grow" : "hidden"
              } px-5 ${
                menuOpen ? "flex-col space-y-1 pt-6" : "flex-row space-x-1"
              }`}
            >
              <div className="flex justify-start w-full">
                <button type="button"         onClick={handleSearch}
                className="flex items-center rounded-l-[10px] bg-[--white] border border-[--high-gray] p-2 hover:border-[--medium-gray] hover:cursor-pointer self-center">
                  <FontAwesomeIcon
                    icon={icons.faSearch}
                    className="text-[--medium-gray] w-[16px] m-1"
                  />
                </button>
                <input
                  type="text"
                  placeholder="Buscar por nombre del instructor o curso."
                  value={searchValue}
                  onChange={handleSearchChange}
                  name="search"
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  className="bg-[--light] rounded-r-[10px] p-2 text-sm w-full"
                />
              </div>
            </div>
            <div onClick={closeMenu}
              className={`flex justify-self-end items-center px-5 ${
                menuOpen ? "flex-col space-y-1" : "flex-row space-x-1"
              }`}
            >
              <NavLinks />
            </div>
            <div
              className={`flex justify-self-end items-center px-5 ${
                sessionActive ? "hidden" : ""
              } ${menuOpen ? "flex-col space-y-1" : "flex-row space-x-1"}`}
            >
              <Link
                key={loginLink.name}
                href={loginLink.href}
                className={`block md:flex-none ${menuOpen ? "my-2" : "mx-2"}`}
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
                className={`block md:flex-none ${menuOpen ? "my-2" : "mx-2"}`}
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
      </div>
    </>
  );
}
