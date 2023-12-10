import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import icons from '../icons/icons';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '../tools/StarRating';

interface CourseCardProps {
  title: string;
  name: string;
  calification: number;
  image: string;
  enrolled: 'none' | 'enrolled' | 'completed' | 'in-progress';
}

const CourseCard: React.FC<CourseCardProps> = ({ title, name, calification, image, enrolled }) => {

  const courseLink = {
    name: "Cursos relacionados",
    path: "/common/categories/category/course",
  };

  const getTipeStyle = () => {
    let style = '';
    switch (enrolled) {
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

  return (
    <Link
      key={courseLink.name}
      href={courseLink.path}
    >
      <div className="p-2 bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 cursor-pointer w-[431px] ">
        <Image
          src={image}
          width={411}
          height={301}
          alt={`Imagen de ${title}`}
          className="rounded-2xl"
        />
        <div className='grid grid-cols-4 gap-1'>
          <div className={`pt-2.5 col-span-3 ${enrolled !== 'none' ? 'col-span-2' : ''} `}>
            <div className="mb-5 px-0.5 w-[100%]">
              <h3 className="font-bold truncate">{title}</h3>
              <p className="font-normal">{name}</p>
            </div>
            <div className="flex w-full">
              <StarRating calification={calification}/>
            </div>
          </div>
          {enrolled !== 'none' && (
            <div className={`flex flex-col items-center justify-center text-[--light] text-base font-bold rounded-2xl my-2 ${getTipeStyle()}`}>
              {enrolled === 'enrolled' &&
                <>
                  <FontAwesomeIcon icon={icons.faPlay} className="w-[18px]" />
                  <p>Sin iniciar</p>
                </>
              }
              {enrolled === 'completed' &&
                <>
                  <FontAwesomeIcon icon={icons.faCheck} className="w-[18px]" />
                  <p>Completado</p>
                </>
              }
              {enrolled === 'in-progress' &&
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