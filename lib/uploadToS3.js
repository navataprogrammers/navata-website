import { AWS_API_BASE_URL } from "./awsApi";

export async function uploadFileToS3(file) {
  const res = await fetch(`${AWS_API_BASE_URL}/upload-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  if (!res.ok) throw new Error("Failed to get upload URL");

  const { uploadUrl, fileUrl } = await res.json();

  const upload = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!upload.ok) throw new Error("Failed to upload file");

  return fileUrl;
}
