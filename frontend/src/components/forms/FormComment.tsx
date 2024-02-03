"use client";
import icons from '../icons/icons';
import Button from '../buttons/Button';
import DifferentText from '../tools/DifferentText';
import { useEffect, useState } from 'react';
import crud_user from '@/app/api/crud_user';
import Swal from 'sweetalert2';
import StarRating from '../tools/StarRating';
import crud_course from '@/app/api/crud_course';
import { useParams } from 'next/navigation';


const FormContact: React.FC = () => {
  const color = "blue";
  const size = "small";

  const {courseID} = useParams()
  
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
    const fetchData = async () => {
      try {
        const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
        const storedUser = await crud_user.getUser(sessionToken || "");
        formData.name = storedUser.name + " " + storedUser.lastname;
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    assessment: 0,
    comment: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "assessment") {
      if (parseFloat(value) > 5) {
        showAlert("La calificación máxima es 5", "warning");
        return;
      } else if (parseFloat(value) < 0) {
        showAlert("La calificación mínima es 0", "warning");
        return;
      }
    }
    setFormData({ 
      ...formData, 
      [name]: name === "assessment" ? parseFloat(value) : value,
    });
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
    if (formData.name === '' || formData.assessment === 0 || formData.comment === '') {
      showAlert("Por favor, rellene todos los campos", "warning");
    } else {
      // sanitize inputs
      const name = escapeHTML(formData.name);
      const assessment = formData.assessment;
      const comment = escapeHTML(formData.comment);

      // send email
      sendComment(name, assessment, comment);
      setFormData({
        name: '',
        assessment: 0,
        comment: '',
      });
    }
  };

  // send email
  const sendComment = async (name: string, assessment: number, comment: string) => {
    const res = {
      name,
      assessment,
      comment,
    }
    const sessionToken = JSON.parse(localStorage.getItem("token") ?? "");
    await crud_course.createComment(
      res,
      courseID.toString(),
      sessionToken,
    );
    showAlert("Gracias por tu retroalimentación", "info");
    window.location.href = "/common/explore";
  };

  return (
    <form onSubmit={handleSubmit} className='w-full bg-[--light] py-5 px-10 md:px-60 rounded-[18px]'>
      <div className='w-full self-center flex flex-col justify-center items-center '>
        <h1 className="text-[32px] xl:text-[38px] pb-4 text-center lg:text-center">
          Has completado el curso
          <br />
          <DifferentText color="--principal-red"> ¡Felicidades!</DifferentText>
        </h1>
        <p className="text-center lg:text-start">
          Deja un comentario sobre tu experiencia en el curso.
        </p>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleInputChange}
            readOnly            
            disabled
            required
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%] disabled cursor-not-allowed"/>
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Calificación:</p>
          <div className='flex justify-between items-center w-[75%]'>
          <input
            type="number"
            name='assessment'
            value={formData.assessment}
            onChange={handleInputChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm" required/>
            <StarRating ranking={formData.assessment}/>
          </div>
        </div>
        <div className="flex items-start justify-between w-full mx-2 p-2">
          <p className="font-bold mt-2">Comentario:</p>
          <textarea
            rows={6}
            name='comment'
            value={formData.comment}
            onChange={handleInputChange}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" required/>
        </div>
        <div>
          <div className="block m-2 md:flex-none"
          >
            <Button
              text="Calificar"
              icon={icons.faStar}
              type={size}
              color={color}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default FormContact;