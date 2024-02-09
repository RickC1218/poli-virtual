import BigSection from "@/components/sections/BigSection";
import Breadcrumbs from "@/components/tools/Breadcrumbs";
import DifferentText from "@/components/tools/DifferentText";
import Section from "@/components/sections/Section";
import crud_category from "@/app/api/crud_category";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
  description: string;
}

export async function generateStaticParams() {
  try {
    // Obtener todas las categorías disponibles
    const categories = await crud_category.getCategories('0');
    // Crear un arreglo de objetos de parámetros para las rutas estáticas
    const paths = categories.map((category: any) => ({
      params: { id: category.id.toString() },
    }));
    return paths;
  } catch (error) {
    console.error("Error fetching categories for static generation:", error);
    return [];
  }
}

export default function Page({ category }: { category: Category }) {
  const routerNotFound = useRouter();

  if (!category || category.id === "") {
    // Manejo de casos en los que no se puede encontrar la categoría
    routerNotFound.push("/common/not-found");
    return null; // O un componente de carga, o un mensaje de error, etc.
  }

  const breadcrumbs = [
    { name: "Categorías", path: "/common/categories" },
    { name: `${category.name}`, path: `/common/categories/${category.id}` },
  ];

  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className="px-6 py-1 md:px-20 bg-[--high-gray]">
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
        addStyle="hidden"
      />
    </div>
  );
}
