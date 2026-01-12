export const uploadResumeToS3 = async (file) => {
  if (!file) throw new Error("No file provided");

  const res = await fetch("/api/get-upload-url", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName: file.name,
      fileType: file.type,
    }),
  });

  const text = await res.text();
  //console.log("UPLOAD URL RESPONSE:", text);

  if (!res.ok) {
    throw new Error("Failed to get upload URL");
  }

  const { uploadUrl, fileUrl } = JSON.parse(text);

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("S3 upload failed");
  }

  return fileUrl;
};
