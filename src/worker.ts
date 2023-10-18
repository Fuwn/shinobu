import { Router, error } from "itty-router";

const router = Router();
// const cache: { [key: string]: { blob: Blob; ts: number } } = {};

const shinobu = async (): Promise<Blob> => {
  // if (cache["shinobu"] && Date.now() - cache["shinobu"].ts < 1000) {
  //   return cache["shinobu"].blob;
  // }

  const blob = await (
    await fetch(
      (
        (await (await fetch(`https://api.waifu.pics/sfw/shinobu`)).json()) as {
          url: string;
        }
      ).url
    )
  ).blob();

  // cache["shinobu"] = {
  //   blob,
  //   ts: Date.now(),
  // };

  return blob;
};

router
  .get(
    "/",
    () =>
      new Response(`/\n
  shinobu`)
  )
  .get("/shinobu", async (_request) => {
    let response = new Response(await shinobu());

    response.headers.set("Cache-Control", "public, max-age=1, s-maxage=1");

    return response;
  })
  .all("*", () => error(404));

export default {
  fetch: (request: Request) => router.handle(request).catch(error),
};
