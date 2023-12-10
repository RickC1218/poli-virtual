import BigSection from "@/components/sections/BigSection";
import DifferentText from "@/components/tools/DifferentText";

export default function Page() {
  return (
    <div className={`flex flex-between w-full h-full flex-col justify-between`}>
      <BigSection
        title={
          <>
            Tu
            <DifferentText color="--principal-blue"> biblioteca </DifferentText>
            de cursos
          </>
        }
        description="Explora y administra tu aprendizaje de manera comoda."
        enrolled="enrolled"
        sectionType="courses"
      />
    </div>
  );
}