"use client";
import DifferentText from "@/components/tools/DifferentText";
import CategoryCard from "@/components/cards/CategoryCard";
import crud_category from "@/app/api/crud_category";

import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}
export default function Page() {

  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async () => {
    try {
      const allCategories = await crud_category.getCategories(0);
      setCategories(Array.isArray(allCategories) ? allCategories : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">
          <DifferentText color="--principal-red">Categorías </DifferentText>
          principales
        </h1>
        <div className="flex flex-wrap py-5 items-center justify-center">
          {categories.map((category: Category) => (
            <div className="p-2" key={category.id}>
              <CategoryCard
                id={category.id}
                name={category.name}
                description={category.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}