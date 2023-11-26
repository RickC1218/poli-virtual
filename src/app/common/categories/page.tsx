import DifferentText from "@/components/DifferentText";
import CategoryCard from "@/components/cards/CategoryCard";

export default function Page() {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-start lg:text-start">
          <DifferentText color="--principal-red">Categorías </DifferentText>
          principales
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 px-32">
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div className="col-span-1">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
        </div>
      </div>
    </div>
  );
}