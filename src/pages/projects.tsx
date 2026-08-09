import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import Seo from "@/components/Other/Seo";
import Projects from "@/components/Templates/Projects/Projects";

const ProjectsPage = () => {
  return (
    <>
      <Seo
        description="Explore DevSecOps and Cloud Infrastructure projects by Hafidz Azzikri — secure pipelines, Kubernetes hardening, cloud migrations and more."
        title="Projects • Hafidz Azzikri"
      />
      <SmoothScrollSection>
        <Projects />
      </SmoothScrollSection>
    </>
  );
};

export default ProjectsPage;
