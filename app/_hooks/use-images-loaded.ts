import { useEffect, useState } from "react";

export const useImagesLoaded = (sources: readonly string[]) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // Decoding (not just loading) keeps the first animation frame from stalling.
    // Failed images resolve as well, so a missing asset cannot block the UI forever.
    const decodeImage = (src: string) => {
      const image = new Image();
      image.src = src;
      return image.decode().catch(() => undefined);
    };

    Promise.all(sources.map(decodeImage)).then(() => {
      if (!cancelled) setLoaded(true);
    });

    return () => {
      cancelled = true;
    };
  }, [sources]);

  return loaded;
};
