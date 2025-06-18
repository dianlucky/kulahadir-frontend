import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "kulahadir.app",
  appName: "kulahadir",
  webDir: "dist",
  plugins: {
    Camera: {
      iosImageWillSave: false,
      iosImageCount: 25,
      iosShowGalleryIcon: true,
      androidImageWillSave: true,
      androidShowGalleryIcon: true,
    },
  },
};

export default config;
