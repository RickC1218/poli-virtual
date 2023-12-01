'use client';

import BigSection from '@/components/BigSection';
import Breadcrumbs from '@/components/Breadcrumbs';
import DifferentText from '@/components/DifferentText';
import Section from '@/components/Section';

export default function Page() {
  const breadcrumbs = [
    { name: 'Categorías', path: '/common/categories' },
    { name: 'Nombre Categoría', path: `/common/categories/category` },
  ];

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='px-6 py-1 md:px-20 bg-[--high-gray]'>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <BigSection
        title={
          <>
            Fundamentos de
            <DifferentText color="--principal-blue"> programación</DifferentText>
          </>
        }
        description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
        enrolled="none"
        sectionType="courses"
      />
      <Section
        title={
          <>
            <DifferentText color="--principal-blue">Instructores </DifferentText>
            destacados
          </>
        }
        description="Descubre a nuestros instructores destacados: expertos en sus campos, apasionados por la enseñanza y listos para guiarte hacia el éxito."
        enrolled="none"
        sectionType="instructors"
        addStyle='hidden'
      />
    </div>
  );
}