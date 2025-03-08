"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function QRScanner() {
  const [qrResult, setQrResult] = useState(null);
  const [audioSrc, setAudioSrc] = useState("");
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    });

    scanner.render(
      (decodedText) => {
        console.log("Scanned QR Code:", decodedText);
        setQrResult(decodedText);
        fetchAudio(decodedText);
      },
      (errorMessage) => {
        console.log("QR Code Scan Error:", errorMessage);
      }
    );

    return () => scanner.clear();
  }, []);

  const fetchAudio = async (code) => {
    try {
      console.log("Fetching audio for code:", code);
      const response = await fetch(`/api/get-audio?code=${code}`);
      const data = await response.json();
      console.log("API Response:", data);
      if (data.audioUrl) {
        console.log("Playing audio:", data.audioUrl);
        playAudio(data.audioUrl);
      } else {
        console.error("Audio not found");
      }
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  };

  const playAudio = (url) => {
    if (!url) return;
    const audio = new Audio(url);
    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log("Audio playback started.");
        })
        .catch((error) => {
          console.error("Autoplay prevented. User action required.", error);
          setAudioSrc(url); // 手動再生用にURLをセット
        });
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">QRコードスキャナー</h1>
      <div id="reader" className="w-full max-w-sm"></div>
      {qrResult && <p className="mt-4">検出されたコード: {qrResult}</p>}
      {audioSrc && !userInteracted && (
        <button
          className="mt-4 bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            setUserInteracted(true);
            playAudio(audioSrc);
          }}
        >
          音声を再生
        </button>
      )}
    </div>
  );
}
