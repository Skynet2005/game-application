import UploadButton from './upload-button';
import cloudinary from 'cloudinary';
import GalleryGrid from './gallery-grid';
import { SearchForm } from './search-form';
import Link from 'next/link';

export type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage(props: { searchParams: Promise<{ search: string }>; }) {
  const searchParams = await props.searchParams;

  const {
    search
  } = searchParams;

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image${search ? ` AND tags=${search}` : ''}`)
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className={`absolute top-0 left-0 w-full h-96 rounded-md filter blur-3xl opacity-50 -z-50 gradientBackgroundGlobal`} />
      <div className="flex flex-col pt-[80px] px-10">
        <div className="flex justify-between pb-20">
          <h1 className="text-4xl font-bold border border-neutral-900/75 rounded-xl p-4 bg-cyan-700/10">
            Gallery
          </h1>
          <div>
            <Link href="/tensor-trunk">
              <p className="bg-cyan-700 border rounded-xl p-2">Home</p>
            </Link>
          </div>
          <UploadButton />
        </div>
        <SearchForm initialSearch={search} />
        <GalleryGrid images={results.resources} />
      </div>
    </section>
  );
}
