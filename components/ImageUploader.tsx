"use client";

import { Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(file));
        onImageUpload(file);
      } else {
        alert("Please select a valid image file.");
      }
    }
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    handleFileChange(event.dataTransfer.files);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition duration-300"
      onDragOver={(event) => event.preventDefault()}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      {preview ? (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Image Preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-10 h-10 text-gray-400 mb-2" />
          <p className="text-gray-500 text-center">
            Drag and drop an image, or click to select one
          </p>
        </div>
      )}
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files)}
      />
    </div>
  );
};

export default ImageUpload;
