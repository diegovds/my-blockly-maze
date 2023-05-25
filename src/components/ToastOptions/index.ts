import { isMobileOnly } from "react-device-detect";
import { DefaultToastOptions } from "react-hot-toast";

export const ToastOptions: DefaultToastOptions = {
  success: {
    style: {
      background: "#07bc0c",
      color: "#fff",
      minWidth: isMobileOnly ? "100%" : 375,
      fontSize: isMobileOnly ? "0.8rem" : 16,
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#07bc0c",
    },
    position: isMobileOnly ? "top-center" : "top-left",
    duration: 2000,
  },
  loading: {
    style: {
      background: "#fdfbfc",
      color: "#000",
      minWidth: isMobileOnly ? "100%" : 375,
      fontSize: isMobileOnly ? "0.8rem" : 16,
    },
    iconTheme: {
      primary: "#000",
      secondary: "#c0c0c0",
    },
    position: isMobileOnly ? "top-center" : "top-left",
  },
  error: {
    style: {
      background: "#e74c3c",
      color: "#fff",
      minWidth: isMobileOnly ? "100%" : 375,
      fontSize: isMobileOnly ? "0.8rem" : 16,
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#e74c3c",
    },
    position: isMobileOnly ? "top-center" : "top-left",
    duration: 3000,
  },
};
