"use client";
import BigSection from '@/components/sections/BigSection';
import Breadcrumbs from '@/components/tools/Breadcrumbs';
import DifferentText from '@/components/tools/DifferentText';
import Section from '@/components/sections/Section';
import crud_category from '@/app/api/crud_category';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function Page() {
  const params = useParams();  
  const routerNotFound = useRouter()
  const id = params.id;

  const [category, setCategory] = useState<Category | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await crud_category.getCategoryById(id);
        if (categoryData === "Error desconocido") {
          routerNotFound.push("/common/not-found");
        } else {
          setCategory(categoryData as Category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!category || (category && category.id === 0)) {
    return  <div className={`flex flex-between w-full h-full flex-col justify-center`}>
              <div className='w-full p-6 md:px-20 md:py-10 self-center'>
                <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">
                  <DifferentText color="--principal-blue">Loading...</DifferentText>
                </h1>
              </div>
            </div>;
  }

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
        title={category.name}
        description={category.description}
        enrolled="none"
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
