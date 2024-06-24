import express from "express";
import gplay from "google-play-scraper";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/app-details", async (req, res) => {
  const { appId } = req.query;
  try {
    const appDetails = await gplay.app({ appId });
    const {
      title: appName,
      icon: logoUrl,
      developer: publisherName,
      version: appVersion,
      androidVersionText: compatibleWith,
      screenshots,
    } = appDetails;

    const screenshotsUrls = screenshots.map((url) => `${url}=w2560-h1440-rw`);
    const formattedLogoUrl = `${logoUrl}=w512-h512-rw`;

    res.json({
      appName,
      logoUrl: formattedLogoUrl,
      publisherName,
      appVersion,
      compatibleWith,
      screenshots: screenshotsUrls,
    });
  } catch (error) {
    console.error("Failed to fetch app details:", error);
    res.status(500).json({ error: "Failed to fetch app details" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
