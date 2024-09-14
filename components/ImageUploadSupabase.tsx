"use client"; // This component needs to be a Client Component

import { useState } from "react";

import { createClient } from "@/utils/supabase/client";

import ImageUpload from "./ImageUploader";

interface ImageUploadProps {
  campaignId: string;
}

const ImageUploadWithSupabase: React.FC<ImageUploadProps> = ({
  campaignId,
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError(null);

    try {
      const filePath = `poster/${campaignId}`;
      const { data, error } = await supabase.storage
        .from("Posters")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Step 2: Get the public URL of the uploaded image (optional)
      const { data: publicUrlData } = supabase.storage
        .from("Posters")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData?.publicUrl;

      // Step 3: Insert a reference into another table
      const { data: insertData, error: insertError } = await supabase
        .from("Campaign") // Replace with your table name
        .update({
          image: imageUrl, // Replace 'image' with your column name
          // Add any other necessary columns here
        })
        .eq("id", campaignId);

      if (insertError) {
        throw insertError;
      }

      console.log("Image reference inserted successfully:", insertData);

      console.log("Image uploaded successfully:", data);
    } catch (uploadError) {
      console.error("Error uploading image:", uploadError);
      setError("Failed to upload the image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      <ImageUpload onImageUpload={handleImageUpload} />
      {uploading && (
        <p className="text-fuchsia-500 mt-2 text-sm">Uploading...</p>
      )}
      {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
    </div>
  );
};

export default ImageUploadWithSupabase;
