// TensorTrunkLayout.tsx
import { SideMenu } from '@/app/[locale]/(dashboard)/(routes)/tensor-trunk/components/sidemenu';

export default function TensorTrunkLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <main className="h-full relative">
      <div className="pl-10 pt-20">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">
            Favorite Images
          </h1>
        </div>
      </div>
      <div className="flex flex-row justify-between p-2">
        <div className="">
          <SideMenu />
        </div>
        <div className="flex-grow flex items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
}
