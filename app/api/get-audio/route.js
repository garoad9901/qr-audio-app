  export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
  
    // QRコードの値と音声URLをマッピング
    const audioDatabase = {
      "123456": "https://choimitena.com/Content/audio/sampleSuper.mp3",
      "789012": "https://example.com/audio2.mp3",
      "111111": "http://garoadrun.s325.xrea.com/test.mp3",

      "http://garoadrun.s325.xrea.com/test.mp3": "http://garoadrun.s325.xrea.com/test.mp3",

      "http://garoadrun.s325.xrea.com/mp3/DS046.MP3": "http://garoadrun.s325.xrea.com/mp3/DS046.MP3",
      "http://garoadrun.s325.xrea.com/mp3/DS047.MP3": "http://garoadrun.s325.xrea.com/mp3/DS047.MP3",
      "http://garoadrun.s325.xrea.com/mp3/DS127.MP3": "http://garoadrun.s325.xrea.com/mp3/DS127.MP3",
      "http://garoadrun.s325.xrea.com/mp3/DS126.MP3": "http://garoadrun.s325.xrea.com/mp3/DS126.MP3",
      "http://garoadrun.s325.xrea.com/mp3/DS052.MP3": "http://garoadrun.s325.xrea.com/mp3/DS052.MP3",
    };
  
    const audioUrl = audioDatabase[code];
  
    if (!audioUrl) {
      return new Response(JSON.stringify({ error: "Audio not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // 追加
          "Access-Control-Allow-Methods": "GET, OPTIONS", // 追加
          "Access-Control-Allow-Headers": "Content-Type", // 追加
        },
      });
    }
  
    return new Response(JSON.stringify({ audioUrl }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // 追加
        "Access-Control-Allow-Methods": "GET, OPTIONS", // 追加
        "Access-Control-Allow-Headers": "Content-Type", // 追加
      },
    });
  }
  