import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../../components/icons/icons";
import Button from "../../../components/buttons/buttons";
import CourseCard from "../../../components/cards/course-card";
import InstructorCard from "../../../components/cards/instructor-card";
import CategoryCard from "../../../components/cards/category-card";
import BannerThemeCard from "@/components/cards/banner-theme-card";
import BannerSubthemeCard from "@/components/cards/banner-subtheme-card";

export default function Page() {
  const iconKeys = Object.keys(icons);

  return (
    <div>
      <h1>explore</h1>
      <h2 className="text-[32px]">Icons</h2>
      <div className="grid grid-cols-10 gap-4">
        {iconKeys.map((iconName) => (
          <div key={iconName}>
            <FontAwesomeIcon icon={icons[iconName as keyof typeof icons]} className="w-[21px] hover:text-[--principal-red]" />
          </div>
        ))}
      </div>
      <br />
      <h2 className="text-[32px]">Buttons</h2>
      <div className="flex justify-around m-2">
        <Button 
          text="Registrarse" 
          icon={icons.faBook} 
          color="red" 
          type="small" 
        />
        <Button 
          text="Iniciar sesión" 
          icon={icons.faEnvelope} 
          color="blue" 
          type="small" 
        />
        <Button 
          text="Contactanos" 
          icon={icons.faUser} 
          color="neutral" 
          type="small" 
        />
      </div>
      <br />
      <div className="flex justify-around">
        <Button 
          text="Registrarse" 
          icon={icons.faBook} 
          color="red" 
          type="big" 
        />
        <Button 
          text="Iniciar sesión" 
          icon={icons.faEnvelope} 
          color="blue" 
          type="big" 
        />
        <Button 
          text="Cambiar contraseña" 
          icon={icons.faUser} 
          color="neutral" 
          type="big" 
        />
      </div>
      <br />
      <h2 className="text-[32px]">Courses</h2>
      <div className="flex justify-around">
        <CourseCard
          title="Internet of Things (IoT) con Arduino y Firebase - 2021 - 2021" 
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled='none'
        />
        <CourseCard
          title="React primeros pasos con Next.js y TailwindCSS 2.0 - 2021"
          name="Ricardo Erazo"
          calification={3.5}
          image='/course.jpg'
          enrolled='enrolled'
        />
      </div>
      <br />
      <div className="flex justify-around">
        <CourseCard
          title="Git y Github"
          name="Ricardo Erazo"
          calification={4.7}
          image='/course.jpg'
          enrolled='in-progress'
        />
        <CourseCard
          title="Redes de computadores"
          name="Ricardo Erazo"
          calification={3}
          image='/course.jpg'
          enrolled='completed'
        />
      </div>
      <br />
      <h2 className="text-[32px]">Instructor</h2>
      <div className="flex justify-around">
        <InstructorCard
          name="Ricardo Erazo"
          description="Estudiante de 9no semestre"
          tutor="Ing. Ordoñez"
          calification={4.5}
          image="/PeterParker.jpg"
        />
        <InstructorCard
          name="Ricardo Erazo"
          description="Estudiante de 9no semestre"
          tutor="Ing. Ordoñez"
          calification={3.5}
          image="/PeterParker.jpg"
        />
        <InstructorCard
          name="Ricardo Erazo"
          description="Estudiante de 9no semestre"
          tutor="Ing. Ordoñez"
          calification={5}
          image="/PeterParker.jpg"
        />
      </div>
      <br />
      <h2 className="text-[32px]">Category</h2>
      <div className="flex justify-around">
        <CategoryCard 
          name="Fundamentos de programación"
          description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software y prácticas de codificación."
        />
        <CategoryCard 
          name="Bases de datos y gestión de datos"
          description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
        />
      </div>
      <br />
      <h2 className="text-[32px]">Banner Theme and Subtheme</h2>
      <BannerThemeCard
        title="Fundamentos de IoT"
        description="Comenzarás con una sólida comprensión de los conceptos básicos de Internet of Things, incluyendo la conectividad de dispositivos, la comunicación entre máquinas y la nube."
        cuantity={4}
        duration={180}
      />
      <BannerSubthemeCard
        title="Conceptos básicos de IoT"
        duration={30}
      />
    </div>
  );
}