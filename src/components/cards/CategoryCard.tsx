import icons from '../icons/icons';
import Button from '../buttons/Buttons';

interface CategoryCardProps {
  name: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, description }) => {
  const text = "Cursos relacionados";
  const color = "blue";
  const size = "big";

  return (
    <div className="flex flex-col justify-around items-center bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 w-[350px] h-[270px] p-[25px]">
      <div className='text-start mb-5'>
        <p className="font-bold pb-4">{name}</p>
        <p className="text-base">{description}</p>
      </div>
      <div>
        <Button
          text={text}
          icon={icons.faBookOpen}
          color={color}
          type={size}
        />
      </div>
    </div>
  );
};

export default CategoryCard;