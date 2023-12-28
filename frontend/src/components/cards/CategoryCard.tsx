import icons from '../icons/icons';
import Button from '../buttons/Button';
import Link from 'next/link';

interface CategoryCardProps {
    id: number;
    name: string;
    description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, description }) => {
  const color = "blue";
  const size = "big";

  const categoryLink = {
    name: "Cursos relacionados",
    path: `/common/categories/${id}`,
  };

  return (
    <div className="flex flex-col justify-around items-center bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 w-[350px] h-[270px] p-[25px]">
      <div className='text-start mb-5'>
        <p className="font-bold pb-4">{name}</p>
        <p className="text-base">{description}</p>
      </div>
      <div>
        <Link
          key={categoryLink.name}
          href={categoryLink.path}
          className="block mx-2 md:flex-none"
        >
          <Button
            text={categoryLink.name}
            icon={icons.faBookOpen}
            type={size}
            color={color}
          />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;