import CourseCard from "../cards/CourseCard";

import { useEffect, useState } from "react";
import crud_course from "@/app/api/crud_course";

interface Instructor {
  name: string;
  email: string;
}

interface Course {
  id: string;
  instructors: Instructor[];
  name: string;
  assessment: number;
  image: string;
  category: BigBannerCardsProps["category"];
  enrolled: "none" | "enrolled" | "completed" | "in-progress";
}
interface BigBannerCardsProps {
  category: string;
}

const BigBannerCards: React.FC<BigBannerCardsProps> = ({ category }) => {
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = async () => {
    try {
      const allCourses = await crud_course.getCourses(category);
      console.log(allCourses)
      setCourses(Array.isArray(allCourses) ? allCourses : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="flex flex-wrap py-5 items-center">
      {courses.map((course: Course) => (
        <div className="md:w-full/3 p-2" key={course.id}>
          <CourseCard
            title={course.name}
            instructors={Array.isArray(course.instructors) ? course.instructors.map((instructor) => instructor.name).join(", ") : "Nombres no encontrados"}
            assessment={course.assessment}
            image="/course.jpg"
            category={category}
            enrolled={course.enrolled}
          />
        </div>
      ))}
    </div>
  );
};

export default BigBannerCards;
