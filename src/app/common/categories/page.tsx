import DifferentText from "@/components/DifferentText";
import CategoryCard from "@/components/cards/CategoryCard";

export default function Page() {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <div className='w-full p-6 md:px-20 md:py-10 self-center'>
        <h1 className="text-[32px] xl:text-[38px] text-center lg:text-start">
          <DifferentText color="--principal-red">Categorías </DifferentText>
          principales
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-0 md:gap-4 py-10 px-10 md:px-8 justify-items-center items-center">
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Fundamentos de programación"
              description="Cursos que cubren diversos lenguajes de programación, metodologías de desarrollo de software."
            />
          </div>
          <div className="col-span-1 py-2 md:py-0">
            <CategoryCard
              name="Bases de datos y gestión de datos"
              description="Enfocados en diseño de bases de datos, SQL, administración de datos y tecnologías de Big Data."
            />
          </div>
          <div  className="col-span-1 py-2 md:py-0">
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