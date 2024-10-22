import { use } from "react";
// src/app/[locale]/page.tsx

import { useTranslations } from "next-intl";
import { getMessages } from "next-intl/server";
import BattleSimulator from '@/components/battle-simulator/BattleSimulator';
import BattleSimulatorNavbar from "@/components/battle-simulator/BattleSimulatorNavbar";

type Messages = {
    NavbarLinks: {
        homeTitle: string;
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
    const title = messages.NavbarLinks.homeTitle;

    return {
        title,
    };
}

export default function Home(props: { params: Promise<{ locale: string }> }) {
    const params = use(props.params);

    const {
        locale
    } = params;

    const t = useTranslations("HomePage");
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full">
                <BattleSimulatorNavbar locale={locale} />
            </div>
            <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
            <BattleSimulator />
        </main>
    );
}
