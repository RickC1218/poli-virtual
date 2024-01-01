import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import icons from '../icons/icons';
import Image from 'next/image';
import Link from 'next/link';
import StarRating from '../tools/StarRating';
import { useParams } from 'next/navigation';

interface CourseCardProps {
  courseID: number;
  title: string;
  instructors: string;
  assessment: number;
  image: string;
  category: string;
  state: 'none' | 'enrolled' | 'completed' | 'in-progress';
}

const CourseCard: React.FC<CourseCardProps> = ({courseID, title, instructors, assessment, image, category, state }) => {

  const {id} = useParams();
  const courseLink = {
    name: "Cursos relacionados",
    path: `/common/categories/${id}/${courseID}`,
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
          <div className={`pt-2.5 col-span-3 ${state !== 'none' ? 'col-span-2' : ''} `}>
            <div className="mb-5 px-0.5 w-[100%]">
              <h3 className="font-bold truncate">{title}</h3>
              <p className="font-normal">{instructors}</p>
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