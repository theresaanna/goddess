import { Gallery } from "next-gallery";
import { list } from '@vercel/blob';

export default async function MyGallery() {
    const response = await list();

    const images = response.blobs.map((blob) => ({
        src: blob.url
    }));

    return <Gallery images={images} />;
}
