import CourseCard from "../cards/CourseCard";

interface BigBannerCardsProps {
  enrolled: 'none' | 'enrolled' | 'completed' | 'in-progress';
  type: 'courses' | 'your-courses' | 'instructors';
}

const BigBannerCards: React.FC<BigBannerCardsProps> = ({ enrolled, type }) => {
  return (
    <div className="grid grid-cols-1 gap-0 md:gap-8 lg:grid-cols-2 2xl:grid-cols-3 py-5 justify-items-center items-center">
      <div className="col-span-1 py-2 lg:py-0">
        <CourseCard
          title="Curso 1"
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled={enrolled}
        />
      </div>
      <div className="col-span-1 py-2 lg:py-0">
        <CourseCard
          title="Curso 2"
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled={enrolled}
        />
      </div>
      <div className="col-span-1 py-2 lg:py-0">
        <CourseCard
          title="Curso 3"
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled={enrolled}
        />
      </div>
      <div className="col-span-1 py-2 lg:py-0">
        <CourseCard
          title="Curso 4"
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled={enrolled}
        />
      </div>
      <div className="col-span-1 py-2 lg:py-0">
        <CourseCard
          title="Curso 5"
          name="Ricardo Erazo"
          calification={4.2}
          image='/course.jpg'
          enrolled={enrolled}
        />
      </div>
    </div>
  );
};

export default BigBannerCards;