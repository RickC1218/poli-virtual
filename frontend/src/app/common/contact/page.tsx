import BigBanner from "@/components/banners/BigBanner";
import DifferentText from "@/components/tools/DifferentText";
import FormContact from "@/components/forms/FormContact";

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