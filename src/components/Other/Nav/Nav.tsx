import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

import { links } from "@/data/nav";
import { NavInterface } from "@/interfaces/NavInterface";

const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavInterface) => {
  const path = usePathname();
  const { t } = useI18n();

  const navKeys: Record<string, 'nav_home' | 'nav_projects' | 'nav_contact'> = {
    home: 'nav_home',
    projects: 'nav_projects',
    contact: 'nav_contact',
  };

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        const key = navKeys[link.name] ?? 'nav_home';
        return (
          <Link
            href={link.path}
            key={index}
            className={`capitalize ${linkStyles}`}
            aria-label={t(key)}
          >
            {link.path === path && (
              <motion.span
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                layoutId="underline"
                className={`${underlineStyles}`}
              />
            )}
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
