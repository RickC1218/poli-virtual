import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import icons from "@/components/icons/icons";
import Link from "next/link";

const BigBanner: React.FC = () => {
  return (
    <section
      className={`flex flex-col w-full h-[150px] md:h-[200px] bg-[--gray] text-[--light] p-6 md:py-6 md:px-20 justify-between`}
    >
      <p>Para mayor información del proyecto, por favor contáctanos</p>
      <section className="py-5">
        <div className="flex py-3 justify-start items-center">
          <Link
            href="https://www.linkedin.com/school/epnecuador/"
            className="block mx-2 md:flex-none hover:font-bold hover:text-[--principal-blue]"
          >
            <p className="mr-5">
              <FontAwesomeIcon
                icon={icons.faLinkedinIn}
                className="w-[20px] hover:text-[--principal-blue] mr-2 cursor-pointer"
              />
              LinkedIn
            </p>
          </Link>
          <Link
            href="https://github.com/RickC1218/poli-virtual"
            className="block mx-2 md:flex-none hover:font-bold hover:text-[--principal-red]"
          >
            <p className="mr-5">
              <FontAwesomeIcon
                icon={icons.faGithub}
                className="w-[20px] mr-2 cursor-pointer"
              />
              GitHub
            </p>
          </Link>
        </div>
        <p>©2023 Equipo PoliVirtual - Todos los derechos reservados</p>
      </section>
    </section>
  );
};

export default BigBanner;
