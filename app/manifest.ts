import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Caisse Au RDV Nogentais",
    short_name: "Caisse RDV",
    description: "Application pour suivre les ventes du café associatif",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon/android-chrome-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
    ],
  };
}
