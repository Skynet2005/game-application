import cloudinary from 'cloudinary';

import AlbumGrid from './album-grid';
import { SearchResult } from '@/app/[locale]/(dashboard)/(tensor-trunk)/gallery/page';
import { ForceRefresh } from '@/components/tensor-trunk/force-refresh';

export default async function AlbumNamePage(props: { params: Promise<{ albumName: string }>; }) {
  const params = await props.params;

  const {
    albumName
  } = params;

  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .sort_by('created_at', 'desc')
    .with_field('tags')
    .max_results(30)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8 pt-16 pl-10 pr-10">
        <AlbumGrid images={results.resources} />
      </div>
    </section>
  );
}
