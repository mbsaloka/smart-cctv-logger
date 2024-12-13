import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

async function BytesToBase64(imageData) {
  let binary = '';
  imageData.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function StreamingVideo({ client, request }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImage = () => {
    client.getImage(request, {}, async (err, response) => {
      if (err) {
        console.error(`Unexpected error: code = ${err.code}, message = "${err.message}"`);
        setError(`Error: ${err.message}`);
        setIsLoading(false);
      } else {
        try {
          setError(null);
          const imageBytes = response.getData();
          const base64String = await BytesToBase64(imageBytes);
          const imageSrc = `data:image/jpeg;base64,${base64String}`;
          setImageUrl(imageSrc);
          setIsLoading(false);
        } catch (error) {
          console.error('Error processing image data:', error);
          setError('Error processing image data');
          setIsLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(getImage, 100); // 33ms delay for ~30fps

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 bg-red-100 text-red-800 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-gray-100 rounded-lg">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="relative group">
          <img
            src={imageUrl}
            alt="CCTV Feed"
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Live CCTV Feed
          </div>
        </div>
      )}
    </div>
  );
}

export default StreamingVideo;
