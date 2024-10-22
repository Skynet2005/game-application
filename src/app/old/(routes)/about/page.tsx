// src/app/[locale]/about/profile/page.tsx

import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import React from "react";

type Messages = {
  NavbarLinks: {
    profileTitle: string;
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
  const title = messages.NavbarLinks.profileTitle;

  return {
    title,
  };
}

const ProfilePage = () => {
  const t = useTranslations("ProfilePage");
  return (
    <div className="flex w-full items-center justify-center">
      <h1 className="text-3xl font-bold mt-20">{t("title")}</h1>
    </div>
  );
};

export default ProfilePage;
