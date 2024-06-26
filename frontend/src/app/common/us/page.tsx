import Banner from "@/components/banners/Banner";
import BigBanner from "@/components/banners/BigBanner";
import DifferentText from "@/components/tools/DifferentText";

export default function Page() {

  return (
    <>
      <Banner
        title={<>
          Nuestra
          <DifferentText color="--principal-red"> misión </DifferentText> 
          es
        </>}
        description="Empoderar a estudiantes universitarios para que se conviertan en instructores de calidad, promoviendo la enseñanza entre pares y el éxito académico."
        button={false}
        image="/image5.jpg"
      />
      <Banner
        title={<>
          Nuestra
          <DifferentText color="--principal-blue"> visión </DifferentText> 
          es
        </>}
        description="Crear una comunidad en línea donde los estudiantes de diferentes niveles académicos compartan conocimientos y habilidades, promoviendo un ciclo constante de aprendizaje y enseñanza para el crecimiento de todos los usuarios."
        button={false}
        image="/image4.jpg"
        addStyle={`bg-[--high-gray]`}
      />
      <BigBanner
        title={<>
          Nuestro
          <DifferentText color="--principal-red"> equ</DifferentText>
          <DifferentText color="--principal-blue">ipo </DifferentText>
          es
        </>}
        description="Nuestro éxito como organización no sería posible sin el compromiso y la dedicación de nuestro talentoso equipo de trabajo. Cada miembro aporta una valiosa experiencia y habilidades únicas que impulsan nuestra misión y visión. Juntos, compartimos un compromiso inquebrantable con la excelencia y la innovación en todo lo que hacemos. Conócenos mejor a continuación y descubre cómo nuestro equipo se esfuerza día a día para llevar a cabo nuestra misión y ofrecer resultados excepcionales."
        button={true}
        image="/image3.jpg"
        textButton="Contáctanos"
      />
    </>
  );
}