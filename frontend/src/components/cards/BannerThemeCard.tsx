"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import icons from "../icons/icons";
import BannerSubThemeCard from "./BannerSubThemeCard";

interface Content {
  title: string;
  video_url: string;
}
export interface BannerThemeCardProps {
  title: string;
  description: string;
  cuantity: number;
  duration: number;
  content: Content[] | null;
  action: "add" | "edit" | "read" | "delete";
}

const BannerThemeCard: React.FC<BannerThemeCardProps> = ({
  title,
  description,
  cuantity,
  duration,
  content,
  action,

}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleAction = () => {
    switch (action) {
      case "add":
        console.log("add");
        break;
      case "edit":
        console.log("edit");
        break;
      case "delete":
        console.log("delete");
        break;
      case "read":
        console.log("read");
        break;
      default:
        console.log("default");
        break;
    }
  };

  return (
    <>
      <div className="flex items-center bg-[--white] rounded-[32px] p-4 my-1 border-2 border-[--medium-gray]">
        <button onClick={handleExpand}>
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
          <div className="pr-16">
            <p className="text-base font-bold">
              {cuantity} clases - {duration} minutos
            </p>
          </div>
        )}
      </div>
      {expanded &&
        content?.map((content, index) => (
          <div key={index} className="w-full mb-1">
            <BannerSubThemeCard
              title={content.title}
              duration={0}
              parentId={title}
              action={action}
            />
          </div>
        ))}
    </>
  );
};

export default BannerThemeCard;
