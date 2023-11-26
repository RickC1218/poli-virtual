import { ReactNode } from 'react';

import BannerCards from './BannerCards';

interface SectionCoursesProps {
  title: ReactNode;
  description: string;
  enrolled: 'none' | 'enrolled' | 'completed' | 'in-progress';
  sectionType: 'courses' | 'instructors';
}

const SectionCourses: React.FC<SectionCoursesProps> = ({ title, description, enrolled, sectionType }) => {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">{title}</h1>
        <p>{description}</p>
        <BannerCards 
          enrolled={enrolled}
          type={sectionType}
        />
      </div>
    </div>
  );
};

export default SectionCourses;