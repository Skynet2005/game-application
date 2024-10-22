// src/app/[locale]/saved-battles/page.tsx

import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

type Messages = {
  NavbarLinks: {
    savedBattles: string;
  };
};

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const messages: Messages = await getMessages({ locale }) as Messages;
  const title = messages.NavbarLinks.savedBattles;

  return {
    title,
  };
}

const SavedBattlesPage = () => {
  const t = useTranslations("SavedBattlesPage");
  return (
    <div className="flex w-full items-center justify-center">
      <h1 className="text-3xl font-bold mt-20">{t("title")}</h1>
    </div>
  );
};

export default SavedBattlesPage;
