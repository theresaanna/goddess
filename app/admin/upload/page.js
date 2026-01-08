'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [preview, setPreview] = useState(null);
    const router = useRouter();

    useEffect(() => {
        // Check if authenticated
        fetch('/api/auth/check')
            .then(res => {
                if (!res.ok) {
                    router.push('/admin');
                }
            });
    }, [router]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        setMessage('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                setMessage(`Successfully uploaded: ${data.blob.pathname}`);
                setFile(null);
                setPreview(null);
                e.target.reset();
            } else {
                const error = await res.json();
                setMessage(`Error: ${error.error}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/admin');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Upload Images</h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-gray-600 hover:text-gray-800"
                    >
                        Logout
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Select Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-4 py-2 border rounded"
                            required
                        />
                    </div>

                    {preview && (
                        <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Preview:</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="max-w-full h-auto max-h-96 rounded"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={uploading || !file}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                    >
                        {uploading ? 'Uploading...' : 'Upload Image'}
                    </button>
                </form>

                {message && (
                    <div className={`mt-4 p-4 rounded ${
                        message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
