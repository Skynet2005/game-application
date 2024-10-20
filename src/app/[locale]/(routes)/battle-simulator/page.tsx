// src/app/[locale]/page.tsx

import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import BattleSimulator from '@/components/BattleSimulator';

type Messages = {
    NavbarLinks: {
        homeTitle: string;
    };
};

export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: string };
}) {
    const messages: Messages = await getMessages({ locale }) as Messages;
    const title = messages.NavbarLinks.homeTitle;

    return {
        title,
    };
}

export default function Home() {
    const t = useTranslations("HomePage");
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
            <BattleSimulator />
        </main>
    );
}
