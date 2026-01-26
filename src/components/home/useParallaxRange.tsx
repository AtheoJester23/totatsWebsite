import { useEffect, useState } from "react";

export function useParallaxRange(
  desktop: { start: number; end: number },
  tablet: { start: number; end: number },
  mobile: { start: number; end: number }
) {
  const [range, setRange] = useState(desktop);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w < 640) {
        setRange(mobile);
      } else if (w < 1024) {
        setRange(tablet);
      } else {
        setRange(desktop);
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return range;
}
