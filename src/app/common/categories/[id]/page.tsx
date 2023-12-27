'use client';

import BigSection from '@/components/sections/BigSection';
import Breadcrumbs from '@/components/tools/Breadcrumbs';
import DifferentText from '@/components/tools/DifferentText';
import Section from '@/components/sections/Section';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import crud_category from '@/app/api/crud_category';

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Page() {

  const params = useParams();

  const [category, setCategory] = useState<Category>({
    id: 0,
    name: '',
    description: '',
  });


  const getCategory = async () => {
    try {
      const category = await crud_category.getCategoryById(params.id);
      setCategory(category);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);
  
  const breadcrumbs = [
    { name: 'Categorías', path: '/common/categories' },
    { name: `${category.name}`, path: `/common/categories/${category.id}` },
  ];

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='px-6 py-1 md:px-20 bg-[--high-gray]'>
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <BigSection
        title={
          <>
            {category.name}
          </>
        }
        description={category.description}
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