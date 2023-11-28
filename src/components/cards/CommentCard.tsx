import StarRating from '../StarRating';

interface CommentCardProps {
  name: string;
  comment: string;
  calification: number;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, comment, calification }) => {
  return (
    <div className="w-full justify-start items-center p-4">
      <div className='flex items-center'>
        <p className="font-bold mr-20">{name}</p>
        <StarRating calification={calification} />
      </div>
      <div className="pt-4">
        <p className="text-base w-full">{comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;