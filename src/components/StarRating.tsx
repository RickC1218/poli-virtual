import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import icons from '@/components/icons/icons';

interface StarRatingProps {
  calification: number;
}

const StarRating: React.FC<StarRatingProps> = ({ calification }) => {
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
    <>
      {renderStars()}
      <div className='px-2 font-bold'>
        {calification.toFixed(1)}
      </div>
    </>
  );
};

export default StarRating;
