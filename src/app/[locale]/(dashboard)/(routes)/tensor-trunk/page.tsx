import Image from 'next/image';
import Upload from '@/app/[locale]/(dashboard)/(routes)/tensor-trunk/components/upload';

export type UploadResult = { info: { public_id: string }; event: 'success' };

export default function Home() {
  return (
    <section className="flex justify-center items-center">
      <div className={`absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal`} />
      <div className="h-full w-full p-4 border rounded-xl flex flex-col items-center">
        <Image src="/placeholder.png" alt="Tensor-Trunk" width={150} height={150} className="" />
        <Upload />
      </div>
      <div className=""></div>
    </section>
  );
}
