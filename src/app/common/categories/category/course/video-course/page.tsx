'use client';

import Link from 'next/link';

import Button from '@/components/buttons/Button';
import icons from '@/components/icons/icons';
import StarRating from '@/components/tools/StarRating';
import BannerThemeCard from '@/components/cards/BannerThemeCard';


export default function Page() {


  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='grid grid-cols-1 gap-0 lg:grid-cols-5 bg-[--gray] lg:gap-2 w-full p-6 md:px-20 md:py-10'>
        <div className='col-span-5 self-center'>
          <iframe
            src="https://www.youtube.com/embed/iT4UOkyI09k?si=lY8CphkWJaNdWMhS"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className='w-full h-[500px] rounded-[25px] contrast-50'
          ></iframe>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-0 lg:grid-cols-5 lg:gap-2 w-full p-6 md:px-20 md:py-10'>
        <div className='col-span-5'>
          <h3 className="text-[32px] text-start">Temario del curso:</h3>
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
        <div className='col-span-5 px-4 pt-6 flex flex-col justify-between items-center sm:items-start'>
          <div className='pt-6 md:pt-0'>
            <h1 className="text-[32px] xl:text-[38px] pb-4">Acerca del curso</h1>
            <p className='font-bold'>Internet of Things - Cámaras de seguridad</p>
            <p className='pb-4'>Alexander Guillin</p>
            <div className="flex w-full">
              <StarRating calification={4} />
            </div>
          </div>
          <div className='flex flex-col md:items-start'>
            <p className="font-bold text-start">Descripción del curso:</p>
            <p>Este emocionante curso de Internet of Things (IoT) - Cámaras de Seguridad es tu entrada al apasionante mundo de la interconexión de dispositivos y la seguridad inteligente. En un mundo cada vez más conectado, este curso te llevará a explorar cómo las cámaras de seguridad pueden desempeñar un papel esencial en una red de IoT para brindar una mayor tranquilidad y control en entornos diversos.
              Durante este curso, te sumergirás en una variedad de temas fundamentales relacionados con IoT y cámaras de seguridad. Aprenderás cómo estas cámaras pueden integrarse de manera efectiva en sistemas de vigilancia y monitoreo, brindando soluciones inteligentes que van más allá de la observación pasiva. Descubrirás cómo utilizar sensores y tecnologías de comunicación para recopilar datos en tiempo real, lo que te permitirá tomar decisiones más informadas y rápidas.
              Nuestro enfoque práctico te brindará la oportunidad de trabajar en proyectos reales, donde podrás diseñar, configurar y gestionar sistemas de cámaras de seguridad basados en IoT. Además, entenderás los aspectos clave de la ciberseguridad y la privacidad, garantizando que tus sistemas estén protegidos de manera sólida contra amenazas cibernéticas.
              A medida que avanzas en el curso, desarrollarás una comprensión sólida de cómo estas tecnologías están transformando la seguridad en hogares, empresas y entornos públicos. Explorarás casos de estudio y ejemplos del mundo real que ilustran la aplicación práctica de IoT en la seguridad, desde el monitoreo de tráfico hasta la vigilancia de la vivienda.
              Ya sea que seas un entusiasta de la tecnología, un profesional de la seguridad o un curioso interesado en las últimas tendencias de IoT, este curso te proporcionará las herramientas y el conocimiento necesarios para destacar en este emocionante campo. Prepárate para desbloquear un mundo de posibilidades en la interconexión de dispositivos y la seguridad inteligente con nuestro curso de Internet of Things (IoT) - Cámaras de Seguridad. ¡Únete a nosotros y comienza a explorar el futuro de la seguridad hoy mismo!</p>
          </div>
        </div>
      </div>

    </div>
  );
}