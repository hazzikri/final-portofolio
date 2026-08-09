import Seo from "@/components/Other/Seo";
import Home from "@/components/Templates/Home/Home";

const HomePage = () => {
  return (
    <>
      <Seo
        description="Mid-Level DevSecOps Engineer specializing in cloud infrastructure security, secure CI/CD pipelines, container hardening, and cloud-native operations on AWS, GCP, and Azure."
        title="Hafidz Azzikri | DevSecOps Engineer"
      />
      <Home />
    </>
  );
};

export default HomePage;
