import CourseCard from "../cards/CourseCard";

import { useEffect, useState } from "react";
import crud_course from "@/app/api/crud_course";

interface Course {
  id: string;
  title: string;
  name: string;
  ranking: number;
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
      setCourses(Array.isArray(allCourses) ? allCourses : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-0 md:gap-8 lg:grid-cols-2 2xl:grid-cols-3 py-5 justify-items-center items-center">
      {courses.map((course: Course) => (
        <div className="col-span-1 py-2 md:py-0" key={course.id}>
          <CourseCard
            title={course.title}
            name={course.name}
            ranking={course.ranking}
            image="/public/course.jpg"
            category={category}
            enrolled={course.enrolled}
          />
        </div>
      ))}
    </div>
  );
};

export default BigBannerCards;
