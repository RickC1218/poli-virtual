import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DifferentText from "@/components/DifferentText";
import icons from "@/components/icons/icons";
import FormProfile from "@/components/FormProfile";

export default function Page() {
  return (
    <div className="grid grid-cols-4 gap-2 place-items-center bg-[--light] p-10">
      <h1 className="text-[38px] col-span-4">Formulario para ser
        <DifferentText color="--principal-red"> instructor</DifferentText>
      </h1>
      <div className="col-span-2 hidden md:block">
        <FontAwesomeIcon icon={icons.faUser} className="w-[300px] h-[300px] text-[--principal-blue]" />
      </div>
      <FormProfile type="be-instructor" />
    </div>
  );
}