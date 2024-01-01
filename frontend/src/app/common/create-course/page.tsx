"use client";
import { useEffect, useState } from "react";
import DifferentText from "@/components/tools/DifferentText";
import FormCourse from "@/components/forms/FormCourse";

export default function Page() {
  const [user, setUser] = useState("");
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("token") ?? "{}");
    setUser(userToken);
  }, []);
  
  return (
    <>
      <div  className={`flex flex-between w-full h-full flex-col justify-between`}>
        <h1 className="text-[38px] text-center col-span-4">
          Crea un nuevo 
          <DifferentText color="--principal-red"> curso</DifferentText>
        </h1>
        <FormCourse />
      </div>
    </>
  );
}
