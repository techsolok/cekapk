"use client";
import { useEffect } from "react";
// Mendaftarkan service worker hanya di production build (di dev, SW mengganggu HMR).
export default function PwaRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => { /* gagal daftar tidak boleh mengganggu situs */ });
    }
  }, []);
  return null;
}
