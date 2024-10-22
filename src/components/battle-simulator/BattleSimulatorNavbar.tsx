// src/components/Navbar.ts
"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const BattleSimulatorNavbar = ({ locale }: { locale: string }) => {
  const t = useTranslations("NavbarLinks");
  const pathname = usePathname();
  const router = useRouter();


  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as string;
    const path = pathname.split("/").slice(2).join("/");
    router.push(`/${newLocale}/${path}`);
  };

  return (
    <div className="w-full flex justify-end py-4 items-center">
      <div className="flex items-center gap-4">
        <select
          value={locale}
          onChange={handleLanguageChange}
          className="rounded-lg px-3 py-2 bg-neutral-200 text-neutral-800 transition duration-300 ease-in-out transform hover:bg-neutral-800 hover:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 shadow-md"
        >
          <option value="en" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">English</option>
          <option value="fr" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">French</option>
          <option value="de" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">German</option>
          <option value="pt" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">Portuguese</option>
          <option value="es" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">Spanish</option>
          <option value="tr" className="block px-4 py-2 bg-neutral-200 text-neutral-800 hover:bg-neutral-900">Turkish</option>
        </select>
      </div>
    </div>
  );
};

export default BattleSimulatorNavbar;
