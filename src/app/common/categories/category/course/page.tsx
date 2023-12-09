'use client';

import Link from 'next/link';

import Breadcrumbs from '@/components/Breadcrumbs';
import Button from '@/components/buttons/Button';
import icons from '@/components/icons/icons';
import StarRating from '@/components/StarRating';
import BannerThemeCard from '@/components/cards/BannerThemeCard';
import CommentCard from '@/components/cards/CommentCard';


export default function Page() {
  const breadcrumbs = [
    { name: 'Categorías', path: '/common/categories' },
    { name: 'Nombre Categoría', path: `/common/categories/category` },
    { name: 'Nombre Curso', path: `/common/categories/category/course` }
  ];

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='px-6 py-1 md:px-20 bg-[--high-gray]'>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <div className='grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20 md:py-10'>
        <div className='col-span-5 lg:col-span-3 self-center'>
          <iframe
            src="https://www.youtube.com/embed/iT4UOkyI09k?si=lY8CphkWJaNdWMhS"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className='w-full h-[450px] rounded-[25px] contrast-50'
          ></iframe>
        </div>
        <div className='col-span-5 lg:col-span-2 px-4 flex flex-col justify-between items-center sm:items-start'>
          <div className='pt-6 md:pt-0'>
            <h1 className="text-[32px] xl:text-[38px] pb-4">Internet Of Things - Cámaras de Seguridad</h1>
            <p className='pb-4'>Alexander Guillin</p>
            <div className="flex w-full">
              <StarRating calification={4} />
            </div>
          </div>
          <div className='flex flex-col md:items-start'>
            <h3 className="text-[32px] text-start">Descripción del curso:</h3>
            <p>Este emocionante curso de Internet of Things (IoT) - Cámaras de Seguridad te sumergirá en el apasionante mundo de la interconexión de dispositivos y la seguridad inteligente. En un mundo cada vez más conectado, aprenderás cómo las cámaras de seguridad pueden ser parte integral de una red de IoT para brindar una mayor tranquilidad y control.</p>
            <div className='mt-6 self-center md:self-start'>
              <Link
                key="Inscribirse"
                href="/signin"
                className="block md:flex-none"
              >
                <Button
                  text="Inscribirse"
                  icon={icons.faBagShopping}
                  color="blue"
                  type="big"
                />
              </Link>
            </div>
          </div>
        </div>
        <div className='col-span-5 py-10'>
          <h3 className="text-[32px] text-start py-4">Temario del curso:</h3>
          <BannerThemeCard
            title="Fundamentos de programación"
            description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            cuantity={10}
            duration={120}
          />
          <BannerThemeCard
            title="Fundamentos de programación"
            description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            cuantity={10}
            duration={120}
          />
          <BannerThemeCard
            title="Fundamentos de programación"
            description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            cuantity={10}
            duration={120}
          />
        </div>
        <div className='col-span-5 py-10'>
          <h3 className="text-[32px] text-start py-4">Comentarios del curso:</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-5 px-10">
            <div className="col-span-1">
              <CommentCard
                name='Ricardo Erazo'
                calification={4}
                comment='¡Acabo de terminar el curso y estoy emocionado por compartir mis pensamientos! Este curso ha sido una experiencia increíble. Aprendí tanto en este período, y no puedo creer cuánto he crecido. Los instructores fueron excepcionales; su pasión por el tema era evidente y su apoyo a lo largo del curso fue inestimable. Las lecciones estaban bien estructuradas y fáciles de seguir, lo que hizo que el aprendizaje fuera fluido. Además, los recursos adicionales y las tareas prácticas me permitieron aplicar lo que aprendí de manera efectiva.'
              />
            </div>
            <div className="col-span-1">
              <CommentCard
                name='Ricardo Erazo'
                calification={4}
                comment='Lo que más aprecié fue la interacción con mis compañeros de curso. Pudimos compartir ideas, resolver problemas juntos y aprender unos de otros. La comunidad que se formó a lo largo del curso fue enriquecedora.'
              />
            </div>
            <div className="col-span-1">
              <CommentCard
                name='Leonardo Andrade'
                calification={2.5}
                comment='Ahora me siento más confiado y preparado para aplicar estos conocimientos en mi carrera. Este curso ha superado mis expectativas y definitivamente lo recomendaría a cualquiera que busque ampliar sus horizontes en esta área. ¡Gracias a todo el equipo detrás de este curso por esta experiencia enriquecedora!'
              />
            </div>
            <div className="col-span-1">
              <CommentCard
                name='Leonardo Andrade'
                calification={4.5}
                comment='Ahora me siento más confiado y preparado para aplicar estos conocimientos en mi carrera. Este curso ha superado mis expectativas y definitivamente lo recomendaría a cualquiera que busque ampliar sus horizontes en esta área. ¡Gracias a todo el equipo detrás de este curso por esta experiencia enriquecedora!'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}