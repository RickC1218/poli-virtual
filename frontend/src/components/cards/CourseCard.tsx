import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import icons from '../icons/icons';
import Link from 'next/link';
import StarRating from '../tools/StarRating';
import { useEffect, useState } from 'react';
import crud_category from '@/app/api/crud_category';
import DifferentText from '../tools/DifferentText';

interface CourseCardProps {
  courseID: number;
  title: string;
  instructor: string;
  assessment: number;
  image: string;
  category: string;
  state: 'none' | 'enrolled' | 'completed' | 'in-progress';
}

const CourseCard: React.FC<CourseCardProps> = ({courseID, title, instructor, assessment, image, category, state }) => {

  const [categoryID, setCategoryID] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  image = image.replace('s3.amazonaws.com/', '')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await crud_category.getCategoryByName(category);
        setCategoryID(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [category]);

  const courseLink = {
    name: "Cursos relacionados",
    path: `/common/categories/${categoryID}/${courseID}`,
  };

  const getTipeStyle = () => {
    let style = '';
    switch (state) {
      case 'enrolled':
        style += 'bg-[--principal-red] ';
        break;
      case 'completed':
        style += 'bg-[--principal-blue] ';
        break;
      case 'in-progress':
        style += 'bg-[--medium-gray] ';
        break;
      default:
        return '';
    }
    return style;
  };

  if (isLoading) {
    return (
      <div
        className={`flex flex-between w-full h-full flex-col justify-center`}
      >
        <div className="w-full p-6 md:px-20 md:py-10 self-center">
          <h1 className="text-center lg:text-start">
            <DifferentText color="--principal-blue">Cargando...</DifferentText>
          </h1>
        </div>
      </div>
    );
  }

  return (
    <Link
      key={courseLink.name}
      href={courseLink.path}
    >
      <div className="p-2 bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 cursor-pointer w-[431px] ">
        <div
          className={`bg-cover w-[411px] h-[301px] bg-center rounded-2xl`}
          style={{
            backgroundImage: `url('${image}')`,
          }}
        ></div>
        <div className='grid grid-cols-4 gap-1'>
          <div className={`pt-2.5 col-span-3 ${state !== 'none' ? 'col-span-2' : ''} `}>
            <div className="mb-5 px-0.5 w-[100%]">
              <h3 className="font-bold truncate">{title}</h3>
              <p className="font-normal">{instructor}</p>
            </div>
            <div className="flex w-full">
              <StarRating ranking={assessment}/>
            </div>
          </div>
          {state !== 'none' && (
            <div className={`flex flex-col items-center justify-center text-[--light] text-base font-bold rounded-2xl my-2 ${getTipeStyle()}`}>
              {state === 'enrolled' &&
                <>
                  <FontAwesomeIcon icon={icons.faPlay} className="w-[18px]" />
                  <p>Sin iniciar</p>
                </>
              }
              {state === 'completed' &&
                <>
                  <FontAwesomeIcon icon={icons.faCheck} className="w-[18px]" />
                  <p>Completado</p>
                </>
              }
              {state === 'in-progress' &&
                <>
                  <FontAwesomeIcon icon={icons.faPause} className="w-[18px]" />
                  <p>Completar</p>
                </>
              }
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;