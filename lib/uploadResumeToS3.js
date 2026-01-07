export const uploadResumeToS3 = async (file) => {
  const res = await fetch(
    "https://0f7louq43b.execute-api.us-east-1.amazonaws.com/get-upload-url",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fileName: file.name,
        fileType: file.type,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to get upload URL");
  }

  const { uploadUrl, fileUrl } = await res.json();

  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to S3");
  }

  return fileUrl;
};
