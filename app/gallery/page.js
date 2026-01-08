import { list } from '@vercel/blob';
import Image from 'next/image';

export default async function MyGallery() {
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
                <div key={index} className="grid-cols-4" style={{ position: 'relative', width: '25%', height: '300px' }}>
                <Image
                    key={index}
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }} // Use CSS for object fit
                />
                </div>
            ))}
        </div>
    );
}