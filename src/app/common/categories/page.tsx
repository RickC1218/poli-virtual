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
      console.log("fetchedCategories", allCategories);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 md:gap-4 py-10 px-10 md:px-8 justify-items-center items-center">
          {categories.map((category: Category) => (
            <div className="col-span-1 py-2 md:py-0" key={category.id}>
              <CategoryCard
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