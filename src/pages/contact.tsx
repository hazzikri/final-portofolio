import Seo from "@/components/Other/Seo";
import Contact from "@/components/Templates/Contact/Contact";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ContactPage = () => {
  return (
    <>
      <Seo
        description="Ready to start a conversation about your infrastructure needs or next cloud project? Get in touch with me here. I'm eager to discuss your ideas and how I can help you achieve your goals."
        title="Contact • Hafidz Azzikri"
      />
      <Contact />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default ContactPage;
