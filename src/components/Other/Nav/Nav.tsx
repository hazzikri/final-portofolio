import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next/pages";

import { links } from "@/data/nav";
import { NavInterface } from "@/interfaces/NavInterface";

const Nav = ({ containerStyles, linkStyles, underlineStyles }: NavInterface) => {
  const path = usePathname();
  const { t } = useTranslation('common');

  return (
    <nav className={`${containerStyles}`}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`capitalize ${linkStyles}`}
            aria-label={t(`nav_${link.name}`)}
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
            {t(`nav_${link.name}`)}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
