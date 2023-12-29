import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import icons from "@/components/icons/icons";

const BigBanner: React.FC = () => {
  return (
    <div className={`flex flex-col w-full h-[150px] md:h-[200px] bg-[--gray] text-[--light] p-6 md:py-6 md:px-20 justify-between`}>
      <p>Para mayor información del proyecto, por favor contáctanos</p>
      <div>
        <div className="flex py-3">
          <FontAwesomeIcon icon={icons.faLinkedinIn} className="w-[20px] hover:text-[--principal-blue] mr-2 cursor-pointer" />
          <p className="mr-5">
            LinkedIn
          </p>
          <FontAwesomeIcon icon={icons.faGithub} className="w-[20px] hover:text-[--principal-blue] mr-2 cursor-pointer" />
          <p className="mr-5">
            GitHub
          </p>
        </div>
        <p>©2023 Equipo PoliVirtual - Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default BigBanner;