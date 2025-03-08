"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [qrResult, setQrResult] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        setQrResult(decodedText);
        fetchAudio(decodedText);
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  const fetchAudio = async (code) => {
    try {
      const response = await fetch(`/api/get-audio?code=${code}`);
      const data = await response.json();
      console.log("API Response:", data); // 追加: APIのレスポンスを確認
      if (data.audioUrl) {
        console.log("Playing audio:", data.audioUrl); // 追加: 再生されるURLを確認
        setAudioSrc(data.audioUrl);
      } else {
        console.error("Audio not found");
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">QRコードスキャナー</h1>
      <div id="reader" className="w-full max-w-sm"></div>
      {qrResult && <p className="mt-4">検出されたコード: {qrResult}</p>}
      {audioSrc && <audio src={audioSrc} controls autoPlay />}
    </div>
  );
}
