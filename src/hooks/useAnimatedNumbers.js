import { useEffect, useRef, useState } from "react";

export function useAnimatedNumber(value, duration = 500) {
  const [display, setDisplay] = useState(value);
  const startValue = useRef(value);
  const startTime = useRef(null);

  useEffect(() => {
    startValue.current = display;
    startTime.current = null;

    function animate(timestamp) {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const next =
        startValue.current +
        (value - startValue.current) * progress;

      setDisplay(Number(next.toFixed(2)));

      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, [value]);

  return display;
}