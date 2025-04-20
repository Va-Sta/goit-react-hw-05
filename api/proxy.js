import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL not set" });
  }
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "internal server error" });
  }
}
