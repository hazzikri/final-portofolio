import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/Other/UI/button";

const Contact = () => {
  const { t } = useI18n();
  return (
    <section className="py-10 bg-secondary/40">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-6">
          <h2 className="h2 max-w-xl text-center mb-2">{t('contact_title')}</h2>
          <p className="text-center text-white/70 max-w-lg">{t('contact_desc')}</p>
          <Link href="/contact">
            <Button>{t('contact_btn')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Contact;
