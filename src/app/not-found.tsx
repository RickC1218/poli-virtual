import Link from "next/link";
import Image from "next/image";

import DifferentText from "@/components/tools/DifferentText";

export default function NotFound() {
  return (
    <div className="h-screen grid grid-cols-4 gap-2 bg-[--white] place-items-center p-10">
      <div className="col-span-2 hidden md:block">
        <Link
          key="Explorar"
          href='/common/explore'
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={300}
            height={212.68}
          />
        </Link>
      </div>
      <div className="col-span-4 md:col-span-2 w-[70%] rounded-[10px] bg-[--light] shadow-md shadow-gray-500/50 p-3 md:p-5 flex flex-col justify-center items-center">
        <h1 className="text-[38px] m-5 text-center align-middle">
          Página no encontrada
        </h1>
        <h1 className="text-[38px] m-5 text-center align-middle">
          Error
          <DifferentText  color="--principal-red"> 404</DifferentText>
        </h1>
      </div>
    </div>
  );
}