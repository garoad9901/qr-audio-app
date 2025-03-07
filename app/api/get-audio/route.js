export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
  
    // QRコードの値と音声URLをマッピング（仮データ）
    const audioDatabase = {
      "123456": "https://example.com/audio1.mp3",
      "789012": "https://example.com/audio2.mp3",
    };
  
    const audioUrl = audioDatabase[code];
  
    if (!audioUrl) {
      return new Response(JSON.stringify({ error: "Audio not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    return new Response(JSON.stringify({ audioUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  