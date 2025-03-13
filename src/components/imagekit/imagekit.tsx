import React, { useState, useRef } from "react";
import axios, { AxiosError } from "axios";

interface ImageKitUploadResponse {
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
}

function ImageKitUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] =
    useState<ImageKitUploadResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files && event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    setUploading(true);

    try {
      const signatureResponse = await axios.get(
        "http://localhost:3001/api/auth/imagekit",
      );
      const { signature, token, expire } = signatureResponse.data;

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("signature", signature);
      formData.append("token", token);
      formData.append("expire", expire);
      formData.append("fileName", selectedFile.name);
      formData.append("publicKey", "public_Hz2jf25tEf60/CkNVogH4eJrYsA=");

      for (const pair of formData.entries() as any) {
        console.log(pair[0] + ", " + pair[1]);
      }

      const uploadResponse = await axios.post<ImageKitUploadResponse>(
        "https://upload.imagekit.io/api/v1/files/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios handle boundary
            Accept: "application/json",
          },
        },
      );

      setUploadResult(uploadResponse.data);
      alert("Upload Successful!");
    } catch (error: any) {
      console.error("Upload error:", error);
      alert("Upload Failed!");
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error("Full error response:", axiosError.response); // Log full response
        setUploadResult(axiosError.response?.data as any);
      } else {
        setUploadResult({ message: "Upload Failed" } as any);
      }
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = null as any;
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} ref={fileInputRef} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadResult && (
        <div>
          <h3>Upload Result:</h3>
          <pre>{JSON.stringify(uploadResult, null, 2)}</pre>
          {uploadResult && uploadResult.url && (
            <img
              src={uploadResult.url}
              alt="Uploaded"
              style={{ maxWidth: "300px" }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default ImageKitUpload;
