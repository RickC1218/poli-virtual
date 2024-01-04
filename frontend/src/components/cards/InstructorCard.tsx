import StarRating from '../tools/StarRating';
import Link from 'next/link';

interface InstructorCardProps {
  email: string;
  name: string;
  lastname: string;
  semester: string;
  tutor: string;
  ranking: number;
  image: string;
}

const InstructorCard: React.FC<InstructorCardProps> = ({ email, name, lastname, semester, tutor, ranking, image }) => {
  
  const urlInstructor = name + "-" + lastname;
  const instructorLink = {
    name: "Perfil del instructor",
    path: `/common/profile/${urlInstructor}`,
  };

  return (
    <Link
      key={instructorLink.name}
      href={instructorLink.path}
    >
      <div className="flex flex-col justify-center items-center p-4 bg-[--white] border border-[--high-gray] rounded-3xl hover:shadow-md hover:shadow-gray-500/50 cursor-pointer w-[250px]">
        <div className='bg-cover w-[175px] h-[175px] bg-top rounded-full' style={{ backgroundImage: `url(${image})` }}>
        </div>
        <div className='flex justify-center items-center'>
          <div className="pt-2.5 text-center">
            <div className='mb-3'>
              <p className="font-bold">{name + " " + lastname}</p>
              <p className="text-base">{semester}</p>
              <p className="text-base">{tutor}</p>
            </div>
            <div className="flex justify-center items-center w-full">
              <StarRating ranking={ranking} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default InstructorCard;