import Seo from "@/components/Other/Seo";
import Home from "@/components/Templates/Home/Home";
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations';

const HomePage = () => {
  return (
    <>
      <Seo
        description="DevSecOps Engineer and Full-Stack Developer specializing in modern cloud infrastructure, secure CI/CD pipelines, and efficient web solutions."
        title="Hafidz Azzikri | DevSecOps Engineer"
      />
      <Home />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default HomePage;
