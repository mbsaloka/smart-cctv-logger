import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

function DownloadButton({ log, variant, type }) {
  console.log("DOWNLOAD BUTTON");
  const fileExtension = log.image.split(".").pop();
  console.log(fileExtension);
  const fileName = "cctv_" + log.date + "_" + log.time + "." + fileExtension;
  console.log(fileName);

  const handleDownload = () => {
    fetch(log.image)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "downloaded-file";
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        console.log("Downloading");
        console.log(url);
        console.log(link);

      })
      .catch((error) => {
        console.error("Error fetching the file:", error);
      });
  };

  return (
    <div>
      <Button variant={variant} onClick={handleDownload} >
        <Download className="h-4 w-4" />
        {(type === "icon" ? null : "Download")}
      </Button>
    </div >
  );
};

export default DownloadButton;