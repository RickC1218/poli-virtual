import icons from '../icons/icons';
import Button from '../buttons/Button';
import Image from 'next/image';
import Link from 'next/link';
import DifferentText from '../tools/DifferentText';


const FormContact: React.FC = () => {
  const color = "blue";
  const size = "small";

  const sentMail = {
    href: "",
    name: "Enviar",
    label: "Enviar",
  };

  return (
    <div className={`flex flex-between w-full h-full lg:h-[700px] flex-col lg:flex-row justify-between`}>
      <div className='w-full lg:w-[50%] p-6 md:p-20 self-center flex flex-col justify-start items-center '>
        <h1 className="text-[32px] xl:text-[38px] pb-4 text-center lg:text-start">
          Contacta con
          <DifferentText color="--principal-red"> nosotros</DifferentText>
        </h1>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Nombre:</p>
          <input
            type="text"
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" />
        </div>
        <div className="flex items-center justify-between w-full mx-2 p-2">
          <p className="font-bold">Email:</p>
          <input
            type="mail"
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" />
        </div>
        <div className="flex items-start justify-between w-full mx-2 p-2">
          <p className="font-bold mt-2">Mensaje:</p>
          <textarea
            rows={7}
            className="bg-[--white] border border-[--high-gray] rounded-[10px] p-2 text-sm w-[75%]" />
        </div>
        <div className="pt-5 lg:pt-10 lg:px-[25%]">
          <Link
            key={sentMail.name}
            href={sentMail.href}
            className="block mx-2 md:flex-none"
          >
            <Button
              text={sentMail.name}
              icon={icons.faChevronRight}
              type={size}
              color={color}
            />
          </Link>
        </div>
      </div>
      <div className="visible justify-self-end self-center pb-20 px-20 lg:p-0">
        <Image
          src="/image.jpg"
          alt="Picture of the author"
          width={750}
          height={535}
          className={`rounded-3xl lg:rounded-none lg:rounded-l-3xl`}
        />
      </div>
    </div>
  );
};

export default FormContact;