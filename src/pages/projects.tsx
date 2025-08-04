import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import Seo from "@/components/Other/Seo";
import Projects from "@/components/Templates/Projects/Projects";

const ProjectsPage = () => {
  return (
    <>
      <Seo
        description="Explore uma galeria de projetos inspiradores e inovadores. Cada projeto é uma demonstração do meu compromisso com a excelência técnica e a entrega de soluções sob medida para os clientes."
        title="Projetos • Adam Neves"
      />
      <SmoothScrollSection>
        <Projects />
      </SmoothScrollSection>
    </>
  );
};

export default ProjectsPage;
