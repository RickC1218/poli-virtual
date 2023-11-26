import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import icons from '../icons/icons';

interface InstructorCardProps {
  name: string;
  description: string;
  tutor: string;
  calification: number;
  image: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ name, description, tutor, calification, image }) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(calification);
    const hasHalfStar = calification % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={icons.faStar} className="w-[18px] text-[--principal-red]" />);
    }

    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={icons.faStarHalfStroke} className="w-[18px] text-[--principal-red]" />);
    }

    const remainingStars = 5 - stars.length;

    for (let i = 0; i < remainingStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={icons.farStar} className="w-[18px] text-[--principal-red]" />);
    }

    return stars;
  };
  return (
    <div className="flex flex-col justify-center items-center p-4 bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 cursor-pointer w-[250px]  ">
      <div className='bg-cover w-[175px] h-[175px] bg-top rounded-full' style={{backgroundImage: `url(${image})`}}>
      </div>
      <div className='flex justify-center items-center'>
        <div className="pt-2.5 text-center">
          <div className='mb-3'>
            <p className="font-bold">{name}</p>
            <p className="text-base">{description}</p>
            <p className="text-base">{tutor}</p>
          </div>
          <div className="flex justify-center items-center w-full">
            {renderStars()}
            <div className='px-2 font-bold'>
              {calification.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorCard;