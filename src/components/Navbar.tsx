// src/components/Navbar.ts

"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const Navbar = ({ locale }: { locale: string }) => {
  const t = useTranslations("NavbarLinks");
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full flex justify-between border-b py-4 items-center">
      <div className="relative">
        <button onClick={toggleMenu} className="text-lg">
          ☰
        </button>
        {isMenuOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-neutral-300 text-neutral-900 border rounded shadow-lg">
            <Link href={`/${locale}/`} className="block px-4 py-2 hover:bg-neutral-900 hover:text-neutral-300">
              {t("home")}
            </Link>
            <Link href={`/${locale}/about`} className="block px-4 py-2 hover:bg-neutral-900 hover:text-neutral-300">
              {t("about")}
            </Link>
            <Link href={`/${locale}/saved-battles`} className="block px-4 py-2 hover:bg-neutral-900 hover:text-neutral-300">
              {t("savedBattles")}
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/about/profile`}>{t("profile")}</Link>
        <select
          value={locale}
          onChange={handleLanguageChange}
          className="rounded-lg px-3 py-2 bg-neutral-200 text-neutral-800 transition duration-300 ease-in-out transform hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 shadow-md"
        >
          <option value="en" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">English</option>
          <option value="fr" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">French</option>
          <option value="de" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">German</option>
          <option value="pt" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">Portuguese</option>
        </select>
      </div>
    </div>
  );
};

export default Navbar;
