"use client";
import icons from '../icons/icons';
import Button from '../buttons/Button';
import Image from 'next/image';
import DifferentText from '../tools/DifferentText';
import { useState } from 'react';
import crud_user from '@/app/api/crud_user';
import Swal from 'sweetalert2';


const FormContact: React.FC = () => {
  const color = "blue";
  const size = "small";

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const escapeHTML = (unsafe: string): string => {
    return unsafe.replace(/[&<">']/g, (match) => {
      switch (match) {
        case "&":
          return "&amp;";
        case "<":
          return "&lt;";
        case '"':
          return "&quot;";
        case "'":
          return "&#x27;";
        case ">":
          return "&gt;";
        default:
          return match;
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.name === '' || formData.email === '' || formData.message === '') {
      showAlert("Por favor, rellene todos los campos", "warning");
    } else {
      // sanitize inputs
      const name = escapeHTML(formData.name);
      const email = escapeHTML(formData.email);
      const message = escapeHTML(formData.message);
      // send email
      sendEmail(name, email, message);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    }
  };

  // send email
  const sendEmail = async (name: string, email: string, message: string) => {
    const res = {
      name,
      email,
      message,
    }
    const response = await crud_user.sendEmailContact(res);
    console.log(response);
    showAlert("Correo enviado a nuestro equipo de soporte", "success");
  };

  return (
    <form onSubmit={handleSubmit} className={`flex flex-between w-full h-full lg:h-[700px] flex-col lg:flex-row justify-between`}>
      <div className='w-full lg:w-[50%] p-6 md:p-20 self-center flex flex-col justify-start items-center '>
        <h1 className="text-[32px] xl:text-[38px] pb-4 text-center lg:text-start">
          Contacta con
          <DifferentText color="--principal-red"> nosotros</DifferentText>
        </h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" required/>
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Email:</p>
          <input
            type="email"
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" required/>
        </div>
        <div className="flex items-start justify-between w-full mx-2 p-2">
          <p className="font-bold mt-2">Mensaje:</p>
          <textarea
            rows={7}
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" required/>
        </div>
        <div className="pt-5 lg:pt-10 lg:px-[25%]">
          <div className="block m-2 md:flex-none"
          >
            <Button
              text="Enviar"
              icon={icons.faChevronRight}
              type={size}
              color={color}
            />
          </div>
        </div>
      </div>
      <div className="visible justify-self-end self-center pb-20 px-20 lg:p-0">
        <Image
          src="/image3.jpg"
          alt="Picture of the author"
          width={750}
          height={535}
          className={`rounded-3xl lg:rounded-none lg:rounded-l-3xl`}
        />
      </div>
    </form>
  );
};

export default FormContact;