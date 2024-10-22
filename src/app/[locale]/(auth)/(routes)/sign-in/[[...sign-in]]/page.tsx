import { SignIn } from '@clerk/nextjs';
import { getLocale } from 'next-intl/server';

export default async function Page() {
  const locale = await getLocale();
  return <SignIn path={`/${locale}/sign-in`} />;
}
