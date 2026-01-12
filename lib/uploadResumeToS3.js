export const uploadResumeToS3 = async (file) => {
  const res = await fetch(
    "https://8gd3sk8a7i.execute-api.ap-south-1.amazonaws.com/get-upload-url",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Upload URL error:", text);
    throw new Error("Failed to get upload URL");
  }

  const { uploadUrl, fileUrl } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to S3");
  }

  return fileUrl;
};
