

import DifferentText from "@/components/DifferentText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "@/components/icons/icons";
import Button from "@/components/buttons/Buttons";
import Link from "next/link";
import FormProfile from "@/components/FormProfile";

export default function Page() {
  const text = "Enviar";
  const color = "blue";
  const size = "small";

  return (
    <div className="grid grid-cols-4 gap-2 place-items-center bg-[--light] p-10">
      <h1 className="text-[38px] col-span-4">Formulario para ser
        <DifferentText color="--principal-red"> instructor</DifferentText>
      </h1>
      <div className="col-span-2 hidden md:block">
        <FontAwesomeIcon icon={icons.faUser} className="w-[300px] h-[300px] text-[--principal-blue]" />
      </div>
      <FormProfile type="be-instructor" />
      <div className="py-10 col-span-4 flex items-center justify-center space-y-2 md:space-x-8 md:space-y-0">
        <Link
          key="sendMail"
          href="/"
        >
          <Button
            text={text}
            icon={icons.faChevronRight}
            color={color}
            type={size}
          />
        </Link>
      </div>
    </div>
  );
}