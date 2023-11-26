import CourseCard from "./cards/CourseCard";
import InstructorCard from "./cards/InstructorCard";

interface BannerCardsProps {
  enrolled: 'none' | 'enrolled' | 'completed' | 'in-progress';
  type: 'courses' | 'instructors';
}

const BannerCards: React.FC<BannerCardsProps> = ({ enrolled, type }) => {
  return (
    <div>
      {type === 'courses' ? (
        <div className="flex overflow-x-auto space-x-2 py-5">
          <div className="w-full">
            <CourseCard
              title="React primeros pasos con Next.js y TailwindCSS 2.0 - 2021"
              name="Ricardo Erazo"
              calification={4.2}
              image='/course.jpg'
              enrolled={enrolled}
            />
          </div>
          <div className="w-full">
            <CourseCard
              title="React primeros pasos con Next.js y TailwindCSS 2.0 - 2021"
              name="Ricardo Erazo"
              calification={4.2}
              image='/course.jpg'
              enrolled={enrolled}
            />
          </div>
          <div className="w-full">
            <CourseCard
              title="React primeros pasos con Next.js y TailwindCSS 2.0 - 2021"
              name="Ricardo Erazo"
              calification={4.2}
              image='/course.jpg'
              enrolled={enrolled}
            />
          </div>
          <div className="w-full">
            <CourseCard
              title="React primeros pasos con Next.js y TailwindCSS 2.0 - 2021"
              name="Ricardo Erazo"
              calification={4.2}
              image='/course.jpg'
              enrolled={enrolled}
            />
          </div>
        </div>
      ) : (
        <div className="flex overflow-x-auto space-x-2 py-5">
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
          <div className="w-full">
            <InstructorCard
              name="Ricardo Erazo"
              description="Estudiante de 9no semestre"
              tutor="Ing. Ordoñez"
              calification={4.5}
              image="/PeterParker.jpg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerCards;