import Seo from "@/components/Other/Seo";
import Contact from "@/components/Templates/Contact/Contact";

const ContactPage = () => {
  return (
    <>
      <Seo
        description="Pronto para iniciar uma conversa sobre seu próximo projeto? Entre em contato comigo aqui. Estou ansioso para discutir suas ideias e como posso ajudá-lo a alcançar seus objetivos de desenvolvimento de software."
        title="Contato • Adam Neves • Portfólio"
      />
      <Contact />
    </>
  );
};

export default ContactPage;
