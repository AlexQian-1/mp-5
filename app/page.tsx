'use client';
import {useState} from 'react';
import {create} from "@/lib/create";


export default function ShortenUrl() {
    const [originalurl, setOriginalurl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (originalurl === '') {
            alert("Cannot be empty")
            return;
        }
        if (!originalurl.match(/^https?:\/\/.+/)) {
            alert('Please enter a valid URL');
            return;
        }
        if (shortUrl === '') {
            alert('Please enter a valid path');
            return;
        }

        create(originalurl, shortUrl).then(res => {

            if (res) {
                setGeneratedUrl(`${window.location.origin}/${shortUrl}`);
                console.log('Success');
            } else {
                alert('Already exists');
            }
        });


    }
    return (
        <div
            className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white">
            <div className="bg-white text-gray-800 p-8 rounded-2xl   w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">URL Shortener</h1>

                <form onSubmit={handleSubmit} className="space-y-4 text-center ">
                    <input
                        type="url"
                        value={originalurl}
                        onChange={(e) => setOriginalurl(e.target.value)}
                        placeholder="Enter Original URL"
                        className="w-full p-3 border rounded-md "
                        required
                    />

                    <div className="flex ">
          <span className="p-3 bg-gray-100 rounded-l-md border border-r-0 text-gray-500 text-sm text-center ">
            http://localhost:3000/
          </span>
                        <input
                            type="text"
                            value={shortUrl}
                            onChange={(e) => setShortUrl(e.target.value)}
                            placeholder="Define path"
                            className=" w-full flex-1 p-3 border border-l-0 rounded-r-md  "
                            required
                        />
                    </div>

                    <button type="submit"
                            className="w-30vw p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-md   ">
                        Shorten URL
                    </button>
                </form>

                {generatedUrl && (
                    <div className="mt-6 p-3 border rounded-md bg-gray-50 text-center">
                        <a href={generatedUrl} target="_blank" className="text-blue-600   break-words">
                            {generatedUrl}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}