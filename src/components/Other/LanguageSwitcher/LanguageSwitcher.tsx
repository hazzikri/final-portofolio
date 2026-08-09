import { useRouter } from 'next/router';
import { useI18n } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useI18n();

  const toggle = () => {
    setLocale(locale === 'en' ? 'id' : 'en');
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="relative group px-3 py-1.5 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-white transition-all duration-300 font-bold text-xs tracking-widest uppercase"
    >
      <span className="transition-opacity duration-200">
        {locale === 'en' ? '🇮🇩 ID' : '🇺🇸 EN'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;
