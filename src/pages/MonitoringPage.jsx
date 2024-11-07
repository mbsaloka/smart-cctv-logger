import React, { useState, useEffect } from 'react';
import cctv from '../proto/cctv_grpc_web_pb';

async function BytesToBase64(imageData) {
  let binary = '';
  imageData.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function MonitoringPage() {
  const MONITORING_GRPC_WEB_API_URL = import.meta.env.VITE_MONITORING_GRPC_WEB_API_URL;
  const client = new cctv.MonitoringClient(MONITORING_GRPC_WEB_API_URL, null, null);
  const emptyRequest = new cctv.Empty();

  const [imageUrl, setImageUrl] = useState(null);

  const getImage = () => {
    client.getImage(emptyRequest, {}, async (err, response) => {
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
    <div className="space-y-6 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold">Monitoring</h1>
      </div>
      <div className="flex justify-center">
      </div>
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

export default MonitoringPage;
