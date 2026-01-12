export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const response = await fetch(
      //  URL from AWS API Gateway endpoint
      "https://8gd3sk8a7i.execute-api.ap-south-1.amazonaws.com/get-upload-url",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const text = await response.text();
    if (!response.ok) {
      //console.error("AWS ERROR:", text);
      return res.status(500).json({ error: text });
    }

    return res.status(200).json(JSON.parse(text));
  } catch (err) {
    //console.error("NEXT API ERROR:", err);
    return res.status(500).json({ error: "Next API failed" });
  }
}
