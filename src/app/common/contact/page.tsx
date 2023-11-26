import BigBanner from "@/components/BigBanner";
import DifferentText from "@/components/DifferentText";
import FormContact from "@/components/FormContact";

export default function Page() {
  return (
    <div>
      <FormContact />
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