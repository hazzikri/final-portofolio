import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next/pages';

const LanguageSwitcher = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLocale = router.locale === 'en' ? 'id' : 'en';
    router.push(router.pathname, router.asPath, { locale: newLocale });
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-semibold text-sm mr-4"
    >
      {router.locale === 'en' ? 'EN' : 'ID'}
    </button>
  );
};

export default LanguageSwitcher;
