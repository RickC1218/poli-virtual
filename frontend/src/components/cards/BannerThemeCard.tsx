import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";
import BannerSubThemeCard from "./BannerSubThemeCard";
import { useEffect, useState } from "react";
import {Module} from "../forms/FormCourse";


const BannerThemeCard: React.FC<Module> = ({
  title,
  description,
  cuantity,
  duration,
  content,
  action,
  currentSubtopic,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    if (action !== "read") {
      return;
    }
    setExpanded(!expanded);
  };

  useEffect(() => {
    if (action !== "read") {
      setExpanded(true);
    }
  }, [action]);

  return (
    <>
      <div className="flex items-center bg-[--white] rounded-[32px] p-4 my-2 border-2 border-[--medium-gray]">
        <button type="button" onClick={handleExpand}>
          <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
            <FontAwesomeIcon
              icon={icons.faChevronRight}
              className={`text-[--white] transform ${
                expanded ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        </button>
        <div className="text-start grow justify-self-start mx-2">
          <p className="text-base line-clamp-2">
            <span className="font-bold">{title}:</span> {description}
          </p>
        </div>
        {action === "read" && (
          <div>
            <p className="text-base font-bold pr-5">
              {cuantity} clases
            </p>
          </div>
        )}
      </div>
      {action === "read" && expanded &&
        content?.map((subthemeCard, id) => {
          const currentIndex = content.findIndex((subtheme) => subtheme.title === currentSubtopic);

          return (
          <div key={id} className={`relative m-1 mx-8 ${id === content.length -1 && 'pb-2'} text-${id > currentIndex ? '[--high-gray]' : '[--gray]'}`}>
            <BannerSubThemeCard {...subthemeCard} action="read" />
          </div>
        )})
      }
    </>
  );
};

export default BannerThemeCard;
