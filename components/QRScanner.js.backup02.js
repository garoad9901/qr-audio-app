"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [qrResult, setQrResult] = useState(null);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // SSR防止
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setQrResult(decodedText);
        playAudio(decodedText);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  const playAudio = (url) => {
    if (audio) {
      audio.pause();
    }
    const newAudio = new Audio(url);
    newAudio.play();
    setAudio(newAudio);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">QRコードスキャナー</h1>
      <div id="reader" className="w-full max-w-sm"></div>
      {qrResult && <p className="mt-4">検出されたURL: {qrResult}</p>}
    </div>
  );
}
