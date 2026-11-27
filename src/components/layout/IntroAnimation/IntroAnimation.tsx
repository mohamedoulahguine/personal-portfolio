"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { LOGO_SEGMENTS, LOGO_VIEWBOX } from "../Logo/logoPath";

import styles from "./IntroAnimation.module.scss";

// ---- constants ----
const DRAW_DURATION = 1.05;
const LOGO_HOLD_DURATION = 0.15;
const UNDRAW_DURATION = 0.65;
const LOGO_DURATION = DRAW_DURATION + LOGO_HOLD_DURATION + UNDRAW_DURATION;
const DOOR_PAUSE_DURATION = 0.15;
const DOOR_DELAY = LOGO_DURATION + DOOR_PAUSE_DURATION;
const DOOR_DURATION = 0.8;
const INTRO_FAILSAFE_MS = (DOOR_DELAY + DOOR_DURATION) * 1000 + 500;

const TOTAL_LENGTH = LOGO_SEGMENTS.reduce(
  (sum, segment) => sum + segment.length,
  0,
);
const LAST_INDEX = LOGO_SEGMENTS.length - 1;

// ---- intro segments ----
const INTRO_SEGMENTS = LOGO_SEGMENTS.map((segment, index) => {
  const startLength = LOGO_SEGMENTS.slice(0, index).reduce(
    (sum, previous) => sum + previous.length,
    0,
  );
  const startRatio = startLength / TOTAL_LENGTH;
  const endRatio = (startLength + segment.length) / TOTAL_LENGTH;
  const undrawStart = DRAW_DURATION + LOGO_HOLD_DURATION;

  const times = [
    0,
    DRAW_DURATION * startRatio,
    DRAW_DURATION * endRatio,
    undrawStart + UNDRAW_DURATION * (1 - endRatio),
    undrawStart + UNDRAW_DURATION * (1 - startRatio),
    LOGO_DURATION,
  ].map((time) => time / LOGO_DURATION);

  const drawEase =
    index === 0 ? "easeIn" : index === LAST_INDEX ? "easeOut" : "linear";
  const undrawEase =
    index === LAST_INDEX ? "easeIn" : index === 0 ? "easeOut" : "linear";

  return {
    d: segment.d,
    times,
    ease: ["linear", drawEase, "linear", undrawEase, "linear"] as const,
  };
});

// ---- lock scroll ----
function lockScroll() {
  const html = document.documentElement;
  const { body } = document;
  const scrollY = window.scrollY;

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.insetInline = "0";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  return () => {
    html.style.overflow = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.insetInline = "";
    body.style.top = "";
    body.style.width = "";
    window.scrollTo(0, scrollY);
  };
}

// ---- component ----
export default function IntroAnimation() {
  const reduceMotion = useReducedMotion() === true;
  const [isVisible, setIsVisible] = useState(true);
  const finishedRef = useRef(false);
  const unlockScrollRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const finishIntro = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;

      unlockScrollRef.current?.();
      unlockScrollRef.current = null;
      document.body.dataset.contentState = "entering";
      setIsVisible(false);
    };

    if (reduceMotion) {
      finishIntro();
      return;
    }

    document.body.dataset.contentState = "hidden";
    unlockScrollRef.current = lockScroll();

    const failsafe = window.setTimeout(finishIntro, INTRO_FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      unlockScrollRef.current?.();
      unlockScrollRef.current = null;
    };
  }, [reduceMotion]);

  const handleDoorComplete = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    unlockScrollRef.current?.();
    unlockScrollRef.current = null;
    document.body.dataset.contentState = "entering";
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className={styles.intro}
      onWheel={(event) => event.preventDefault()}
      onTouchMove={(event) => event.preventDefault()}
    >
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-100%" }}
        transition={{
          delay: DOOR_DELAY,
          duration: DOOR_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: "calc(50% + 1px)",
          background: "var(--primary)",
          willChange: "transform",
        }}
      />

      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "100%" }}
        transition={{
          delay: DOOR_DELAY,
          duration: DOOR_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
        onAnimationComplete={handleDoorComplete}
        style={{
          position: "absolute",
          inset: "0 0 0 auto",
          width: "calc(50% + 1px)",
          background: "var(--primary)",
          willChange: "transform",
        }}
      />

      <svg
        viewBox={LOGO_VIEWBOX}
        xmlns="http://www.w3.org/2000/svg"
        className={styles.intro__logo}
      >
        {INTRO_SEGMENTS.map(({ d, times, ease }, index) => (
          <motion.path
            key={index}
            d={d}
            fill="none"
            stroke="var(--primary-on)"
            strokeWidth={9}
            strokeLinecap="butt"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 0, 1, 1, 0, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              pathLength: {
                duration: LOGO_DURATION,
                times,
                ease: [...ease],
              },
              opacity: {
                duration: LOGO_DURATION,
                times: [0, 0.03, 0.94, 1],
                ease: "linear",
              },
            }}
          />
        ))}
      </svg>
    </div>
  );
}
