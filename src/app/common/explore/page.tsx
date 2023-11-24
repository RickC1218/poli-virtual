import Banner from "@/components/Banner";
import DifferentText from "@/components/DifferentText";
import BigBanner from "@/components/BigBanner";

export default function Page() {

  return (
    <div>
      <Banner
        title={<>
          Una nueva forma de
          <DifferentText color="--principal-red"> aprender </DifferentText>
          creada
          <DifferentText color="--principal-blue"> por </DifferentText>
          estudiantes
          <DifferentText color="--principal-blue"> para </DifferentText>
          estudiantes.
        </>}
        description="¡Descubre una comunidad educativa única y emocionante! 
        En nuestra plataforma de educación virtual, los estudiantes se convierten en maestros, compartiendo su conocimiento y pasión."
        button={true}
        image={true}
      />
      <BigBanner
        title={
          <>
            <DifferentText color="--principal-red">Únete </DifferentText>
            y
            <DifferentText color="--principal-blue"> transforma </DifferentText>
            tu futuro hoy
          </>
        }
        description="Al unirse a nuestra plataforma, tendrán acceso a oportunidades educativas innovadoras que les permitirán adquirir nuevas habilidades y conocimientos que pueden aplicar de inmediato en sus vidas y carreras."
        button={true}
        image={false}
      />
    </div>
  );
}