import React, { useState, useEffect } from 'react';

async function BytesToBase64(imageData) {
  let binary = '';
  imageData.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function StreamingVideo({ client, request }) {
  const [imageUrl, setImageUrl] = useState(null);

  const getImage = () => {
    client.getImage(request, {}, async (err, response) => {
      if (err) {
        console.error(`Unexpected error: code = ${err.code}, message = "${err.message}"`);
      } else {
        try {
          const imageBytes = response.getData();
          const base64String = await BytesToBase64(imageBytes);
          const imageSrc = `data:image/jpeg;base64,${base64String}`;
          setImageUrl(imageSrc);
        } catch (error) {
          console.error('Error processing image data:', error);
        }
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(getImage, 33); // 33ms delay for ~30fps

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      {imageUrl ? (
        <div className="flex justify-center">
          <img src={imageUrl} alt="CCTV Image" />
        </div>
      ) :
        <div className="flex justify-center">
          <p>Loading...</p>
        </div>
      }
    </div>
  );
}

export default StreamingVideo;
