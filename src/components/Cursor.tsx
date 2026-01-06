import { useEffect, useRef } from "react";

type Props = {
  enabled?: boolean;
};

export default function Cursor({ enabled = true }: Props) {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Hide on touch devices
    const isCoarse =
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    if (isCoarse) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    if (!ring || !dot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;

    let rx = mx;
    let ry = my;

    let visible = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;

      if (!visible) {
        visible = true;
        ring.style.opacity = "1";
        dot.style.opacity = "1";
      }
    };

    const onLeave = () => {
      visible = false;
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };

    const onDown = () => {
      ring.classList.add("cursor--down");
      dot.classList.add("cursor--down");
    };
    const onUp = () => {
      ring.classList.remove("cursor--down");
      dot.classList.remove("cursor--down");
    };

    const setInteractive = (v: boolean) => {
      if (v) ring.classList.add("cursor--hover");
      else ring.classList.remove("cursor--hover");
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // You can customize what counts as “interactive”
      const interactive = !!target.closest(
        'a,button,[role="button"],input,textarea,select,[data-cursor="hover"]'
      );
      setInteractive(interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });

    let raf = 0;
    const loop = () => {
      // dot = immediate
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;

      // ring = eased follow
      if (prefersReduced) {
        rx = mx;
        ry = my;
      } else {
        rx += (mx - rx) * 0.14;
        ry += (my - ry) * 0.14;
      }
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Hollow ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
      />
      {/* Center dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
      />
    </>
  );
}
