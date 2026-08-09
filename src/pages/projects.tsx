import SmoothScrollSection from "@/components/Animations/SmoothScrollSection";
import Seo from "@/components/Other/Seo";
import Projects from "@/components/Templates/Projects/Projects";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';

const ProjectsPage = () => {
  return (
    <>
      <Seo
        description="Explore a gallery of inspiring and innovative DevSecOps and Cloud projects. Each project demonstrates a commitment to technical excellence, security, and scalable solutions."
        title="Projects • Hafidz Azzikri"
      />
      <SmoothScrollSection>
        <Projects />
      </SmoothScrollSection>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ProjectsPage;
