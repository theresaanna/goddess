import { list } from '@vercel/blob';
import Image from 'next/image';

export default async function MyGallery() {
    try {
        const response = await list();

        if (!response || !response.blobs || !Array.isArray(response.blobs)) {
            return <div>No images found</div>;
        }

        const images = response.blobs.map((blob) => ({
            src: blob.url,
            alt: blob.pathname
        }));

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                ))}
            </div>
        );
    } catch (error) {
        console.error('Error fetching blobs:', error);
        return <div>Error loading images: {error.message}</div>;
    }
}