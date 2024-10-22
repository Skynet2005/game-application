// TensorTrunkLayout.tsx
import { SideMenu } from '@/app/[locale]/(dashboard)/(routes)/tensor-trunk/components/sidemenu';

export default async function AlbumLayout(
  props: { children: React.ReactNode; params: Promise<{ albumName: string }>; }
) {
  const params = await props.params;

  const {
    albumName
  } = params;

  const {
    children
  } = props;

  return (
    <main className="h-full relative">
      <div className="pl-10 pt-20">
        <div className="flex justify-between">
          <h1 className="text-4xl top-0 font-bold">Album: {albumName}</h1>
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
