import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../icons/icons";
import BannerSubThemeCard from "./BannerSubThemeCard";
import { useEffect, useState } from "react";
import {Module} from "../forms/FormCourse";
import Link from "next/link";
import crud_user from "@/app/api/crud_user";
import Swal from "sweetalert2";


const BannerThemeCard: React.FC<Module> = ({
  title,
  description,
  cuantity,
  duration,
  content,
  action,
  currentSubtopic,
  course,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    if (action !== "read") {
      return;
    }
    setExpanded(!expanded);
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const showAlert = (
    message: string,
    type: "success" | "error" | "warning" | "info"
  ) => {
    Toast.fire({
      icon: type,
      text: message,
      showConfirmButton: false,
      timer: 4000,
    });
  };

  useEffect(() => {
    if (action !== "read") {
      setExpanded(true);
    }
  }, [action]);

  const handleLinkSubtheme = async (subtheme: string) => {
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
    const response = crud_user.getEnrolledCourses(sessionToken);
    console.log(response)
    if (!course) {
      showAlert("Aún no te has inscrito en este curso.", "warning")
    } else {
      await crud_user.addLastVideoWatched(
        {
          "name": course,
          "state": "in-progress",
          "last_module_name": title,
          "last_subtopic_name": subtheme,
        },
        sessionToken,
      );
    }
  };

  return (
    <>
      <button type="button" className="w-full flex items-center bg-[--white] rounded-[32px] p-4 my-2 border-2 border-[--medium-gray] " onClick={handleExpand}>
          <div className="w-[50px] h-[50px] rounded-2xl bg-[--principal-red] flex justify-center items-center cursor-pointer hover:shadow-md hover:shadow-red-500/50">
            <FontAwesomeIcon
              icon={icons.faChevronRight}
              className={`text-[--white] transform ${
                expanded ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
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
      </button>
      {action === "read" && expanded &&
        content?.map((subthemeCard, id) => {
          return (
          <div key={id} className={`relative m-1 mx-8 ${id === content.length -1 && 'pb-2'} text-${currentSubtopic === subthemeCard.title ? '[--principal-red]' : '[--medium-gray]'}`}>
            <Link
              href={`${title}_${subthemeCard.title}`}
              onClick={() => handleLinkSubtheme(subthemeCard.title)}
            >
              <BannerSubThemeCard {...subthemeCard} action="read" />
            </Link>
          </div>
        )})
      }
    </>
  );
};

export default BannerThemeCard;
