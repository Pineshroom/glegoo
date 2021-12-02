import { serve  } from "https://deno.land/std@0.116.0/http/server.ts";

serve(async (req) => {
      const url = new URL(req.url);
      url.protocol = "https:";
      url.hostname = "google.com";
      url.port = "443";
      const resp = await fetch(url.href);
      const bodyProcessed = resp.body
        .pipeThrough(new TextDecoderStream())
        .pipeThrough(
            new TransformStream({
                transform: (chunk, controller) => {
                              controller.enqueue(chunk);
                },
            }),
        )
        .pipeThrough(new TextEncoderStream());

    return new Response(bodyProcessed, {
            status: resp.status,
            headers: resp.headers,
    });
});
console.log("Listening on http://localhost:8000");
