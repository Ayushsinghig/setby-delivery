"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const EASE = [0.241, 0, 0.138, 1] as const;
const SOFT_EASE = [0.284, 0.009, 0.138, 1] as const;
const FIGMA_TIMELINE = 27.164;
const INTRO_TIMELINE = FIGMA_TIMELINE * 2.25;
const INTRO_DISMISS_DELAY = 3200;

const SECTION_SHELL =
  "mx-auto w-[min(calc(100%_-_64px),1500px)] max-[760px]:w-[min(calc(100%_-_36px),1500px)]";
const MONO_LABEL = "font-[var(--font-chivo-mono)] uppercase tracking-[0.04em]";
const SECTION_LABEL = `${MONO_LABEL} flex items-center gap-3.5 text-[clamp(0.78rem,1vw,1rem)]`;
const BUTTON =
  "group relative isolate inline-flex min-h-14 items-center justify-center gap-3.5 overflow-hidden border border-transparent px-[26px] py-4 text-[0.95rem] font-semibold leading-none transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] before:absolute before:inset-0 before:-z-1 before:translate-y-[102%] before:bg-white before:transition-transform before:duration-[360ms] before:ease-[cubic-bezier(0.241,0,0.138,1)] before:content-[''] hover:-translate-y-0.5 hover:text-[#0c0c0c] hover:shadow-[0_10px_34px_rgba(12,12,12,0.14)] hover:before:translate-y-0 focus-visible:-translate-y-0.5 focus-visible:text-[#0c0c0c] focus-visible:shadow-[0_10px_34px_rgba(12,12,12,0.14)] focus-visible:before:translate-y-0 motion-reduce:transition-none motion-reduce:before:transition-none max-[760px]:min-h-[52px] max-[760px]:px-[19px] max-[760px]:py-3.5 max-[760px]:text-[0.84rem]";
const INTRO_PANEL =
  "absolute top-0 h-full border-0 bg-[#ff5c32] shadow-[0_0_0_1px_#ff5c32] will-change-transform";
const FEATURE =
  "absolute z-[4] max-w-[230px] text-[clamp(1.2rem,1.8vw,1.8rem)] leading-[1.08] max-[760px]:max-w-[150px] max-[760px]:text-base";

const introPanels = [
  {
    nodeId: "1:801",
    position: "left-0 w-[2.08%]",
    end: 0.0199,
    ease: SOFT_EASE,
  },
  {
    nodeId: "1:800",
    position: "left-[2.06%] w-[23.95%]",
    end: 0.0248,
    ease: EASE,
  },
  {
    nodeId: "1:802",
    position: "left-[25.98%] w-[23.95%]",
    end: 0.0297,
    ease: EASE,
  },
  {
    nodeId: "1:803",
    position: "left-[49.92%] w-[23.95%]",
    end: 0.0349,
    ease: EASE,
  },
  {
    nodeId: "1:804",
    position: "left-[73.87%] w-[23.95%]",
    end: 0.0399,
    ease: EASE,
  },
  {
    nodeId: "1:805",
    position: "right-0 w-[2.18%]",
    end: 0.045,
    ease: EASE,
  },
];

const services = [
  {
    title: "Global Freight",
    tags: ["logistics solution", "shipping process", "advanced tracking"],
    copy: "One connected route across air, sea, road, and rail—with clear ownership from origin to arrival.",
  },
  {
    title: "Express Delivery",
    tags: ["transport methods", "custom packaging", "integrated warehouse"],
    copy: "Urgent shipments planned around real constraints, handled with speed without trading away control.",
  },
  {
    title: "Cargo Connect",
    tags: ["worldwide freight", "documentation", "risk management"],
    copy: "A single operations layer for global partners, paperwork, milestones, and exception management.",
  },
  {
    title: "Parcel Transit",
    tags: ["diverse cargo types", "dedicated support"],
    copy: "Flexible parcel movement for varied loads, backed by people who stay close to every handoff.",
  },
];

const stats = [
  ["8k+", "shipments moved"],
  ["12k+", "routes connected"],
  ["200", "global partners"],
];

const features = [
  {
    label: "On-time delivery",
    route: "/assets/route-a.svg",
    position:
      "right-[6%] top-[13%] max-[760px]:right-[4%] max-[760px]:top-[9%]",
  },
  {
    label: "Guaranteed security",
    route: "/assets/route-b.svg",
    position: "left-[5%] top-[24%] max-[760px]:left-[3%] max-[760px]:top-[20%]",
    reverse: true,
  },
  {
    label: "Real-time tracking",
    route: "/assets/route-c.svg",
    position:
      "bottom-[13%] left-[7%] max-[760px]:bottom-[16%] max-[760px]:left-[4%]",
    reverse: true,
  },
  {
    label: "24/7 support",
    route: "/assets/route-d.svg",
    position:
      "right-[8%] bottom-[12%] max-[760px]:right-[5%] max-[760px]:bottom-[9%]",
  },
];

function Reveal({
  children,
  className = "",
  delay = 0,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 54 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.82, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Arrow() {
  return (
    <span
      className="relative z-1 inline-grid size-5 place-items-center transition-transform duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
      aria-hidden="true"
    >
      <span className="absolute h-[1.5px] w-4 bg-current" />
      <span className="absolute right-px h-[1.5px] w-2 origin-right rotate-45 bg-current" />
      <span className="absolute right-px h-[1.5px] w-2 origin-right -rotate-45 bg-current" />
    </span>
  );
}

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-bold tracking-[-0.04em] ${inverted ? "brightness-0 invert" : ""}`}
      aria-label="Setby home"
    >
      <span
        className="flex h-8.25 w-15 items-center overflow-hidden"
        aria-hidden="true"
      >
        <img
          className="h-8.25 w-auto shrink-0"
          src="/assets/logo-mark-a.svg"
          alt=""
        />
        <img
          className="-ml-3 h-8.25 w-auto shrink-0"
          src="/assets/logo-mark-b.svg"
          alt=""
        />
        <img className="hidden" src="/assets/logo-type.svg" alt="" />
      </span>
      <span className="text-[1.08rem]">Setby.</span>
    </span>
  );
}

function OpeningIntro() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(
      () => setVisible(false),
      INTRO_DISMISS_DELAY,
    );
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="pointer-events-none fixed inset-0 z-1000 overflow-hidden motion-reduce:hidden"
          aria-hidden="true"
        >
          {introPanels.map((panel) => (
            <motion.div
              className={`${INTRO_PANEL} ${panel.position}`}
              data-node-id={panel.nodeId}
              key={panel.nodeId}
              initial={{ y: 0 }}
              animate={{ y: [0, 0, -1690, -1690] }}
              transition={{
                y: {
                  duration: INTRO_TIMELINE,
                  times: [0, 0.005, panel.end, 1],
                  ease: ["linear", panel.ease, "linear"],
                },
              }}
            />
          ))}

          <div className="absolute inset-0 z-2 grid place-items-center">
            <motion.div
              className="flex w-[clamp(180px,15.45vw,396px)] flex-col items-center will-change-transform"
              data-node-id="1:806"
              initial={{ y: 0 }}
              animate={{ y: [0, 0, -1690, -1690] }}
              transition={{
                y: {
                  duration: INTRO_TIMELINE,
                  times: [0, 0.005, 0.0248, 1],
                  ease: ["linear", EASE, "linear"],
                },
              }}
            >
              <div className="relative aspect-396/162 w-full">
                <img
                  className="absolute top-0 left-0 h-full w-[27.08%]"
                  data-node-id="1:807"
                  src="/assets/intro-mark-a.svg"
                  alt=""
                />
                <img
                  className="absolute top-0 left-[25.63%] h-full w-[27.08%]"
                  data-node-id="1:808"
                  src="/assets/intro-mark-b.svg"
                  alt=""
                />
                <span
                  className="absolute top-0 left-[51.27%] h-full w-[48.73%]"
                  data-node-id="1:809"
                >
                  <img
                    className="h-full w-full"
                    src="/assets/intro-mark-type.svg"
                    alt=""
                  />
                  <strong
                    className="absolute top-[49.95%] left-[14.85%] text-[clamp(1.62rem,2.32vw,3.72rem)] leading-none font-bold tracking-[-0.06em] whitespace-nowrap text-[#ff5c32]"
                    data-node-id="1:810"
                  >
                    Setby.
                  </strong>
                </span>
              </div>
              <p
                className="mt-[clamp(12px,1.1vw,28px)] text-[clamp(0.66rem,1.17vw,1.88rem)] leading-none font-(--font-chivo-mono) tracking-[-0.01em] text-white uppercase"
                data-node-id="1:811"
              >
                Enhanced Logistics
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

const NAV_LINK =
  "relative text-[0.94rem] after:absolute after:-bottom-[7px] after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.241,0,0.138,1)] after:content-[''] hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:after:transition-none";

function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);

  return (
    <motion.header
      className="absolute top-0 left-0 z-30 grid h-25 w-full grid-cols-[auto_1fr_auto] items-center gap-13.5 px-[4vw] py-5.5 max-[1100px]:h-20.5 max-[1100px]:grid-cols-[1fr_auto] max-[1100px]:gap-4 max-[1100px]:px-6 max-[1100px]:py-4.5"
      data-node-id="1:657"
      initial={reduceMotion ? false : { y: -187.164 }}
      animate={reduceMotion ? undefined : { y: [-187.164, -187.164, 0] }}
      transition={{
        y: {
          duration: FIGMA_TIMELINE * 0.0297,
          times: [0, 0.0099 / 0.0297, 1],
          ease: ["linear", EASE],
        },
      }}
    >
      <a className="inline-flex w-fit" href="#top" onClick={close}>
        <Brand />
      </a>

      <nav
        className="flex items-center gap-[clamp(26px,4vw,74px)] justify-self-center max-[1100px]:hidden"
        aria-label="Primary navigation"
      >
        <a className={NAV_LINK} href="#about">
          About us
        </a>
        <a className={NAV_LINK} href="#services">
          Services
        </a>
        <a className={NAV_LINK} href="#projects">
          Projects
        </a>
        <a className={NAV_LINK} href="#contact">
          Contact
        </a>
      </nav>

      <a
        className={`${BUTTON} min-h-13 bg-[#0c0c0c] px-5.5 py-3.5 text-white max-[1100px]:hidden`}
        href="#contact"
      >
        Contact us <Arrow />
      </a>

      <button
        className="hidden size-12 cursor-pointer flex-col items-center justify-center gap-1.75 border border-black/25 bg-white/80 p-0 max-[1100px]:flex"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span
          className={`h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] motion-reduce:transition-none ${open ? "translate-y-1 rotate-45" : ""}`}
        />
        <span
          className={`h-px w-5 bg-current transition-transform duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] motion-reduce:transition-none ${open ? "-translate-y-1 -rotate-45" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="absolute top-3 right-3 left-3 z-[-1] hidden flex-col border border-black/12 bg-white/96 px-7 pt-23 pb-7.5 shadow-[0_30px_90px_rgba(0,0,0,0.12)] backdrop-blur-[18px] max-[1100px]:flex"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            {["About us", "Services", "Projects", "Contact"].map((label) => (
              <a
                className="border-t border-black/14 py-4.5 text-2xl tracking-[-0.04em]"
                href={`#${label.toLowerCase().replace(" ", "-").replace("-us", "")}`}
                onClick={close}
                key={label}
              >
                {label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function DeliveryWord() {
  const reduceMotion = useReducedMotion();
  const characters = [
    {
      letter: "D",
      nodeId: "1:644",
      start: 0,
      end: 0.0223,
      x: 0,
      position: "left-0",
    },
    {
      letter: "e",
      nodeId: "1:645",
      start: 0.002,
      end: 0.0243,
      x: -21,
      position: "left-[21.82%] max-[760px]:left-[21.1%]",
    },
    {
      letter: "l",
      nodeId: "1:646",
      start: 0.004,
      end: 0.0263,
      x: -36,
      position: "left-[38.89%] max-[760px]:left-[37.67%]",
    },
    {
      letter: "i",
      nodeId: "1:647",
      start: 0.006,
      end: 0.0283,
      x: -54,
      position: "left-[45.53%] max-[760px]:left-[43.68%]",
    },
    {
      letter: "v",
      nodeId: "1:648",
      start: 0.0079,
      end: 0.0303,
      x: -65,
      position: "left-[52.49%] max-[760px]:left-[50.27%]",
    },
    {
      letter: "e",
      nodeId: "1:649",
      start: 0.0099,
      end: 0.0322,
      x: -90,
      position: "left-[67.67%] max-[760px]:left-[64.59%]",
    },
    {
      letter: "r",
      nodeId: "1:650",
      start: 0.0119,
      end: 0.0342,
      x: -107,
      position: "left-[84.74%] max-[760px]:left-[81.08%]",
    },
    {
      letter: "y",
      nodeId: "1:651",
      start: 0.0139,
      end: 0.0362,
      x: -104,
      position: "left-[95.97%] max-[760px]:left-[92.42%]",
    },
  ];

  return (
    <span
      className="relative h-[1em] w-[49.34vw] self-end pr-[0.07em] max-[760px]:w-full max-[760px]:self-start max-[760px]:pr-0 max-[760px]:pb-42.5"
      aria-label="Delivery"
    >
      {characters.map((character) => (
        <motion.span
          className={`absolute top-0 block ${character.position}`}
          aria-hidden="true"
          data-node-id={character.nodeId}
          key={character.nodeId}
          initial={reduceMotion ? false : { opacity: 0, x: 0, y: 32 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: character.start ? [0, 0, 1] : [0, 1],
                  x: ["0vw", `${character.x / 25.64}vw`],
                  y: character.start ? [32, 32, 0] : [32, 0],
                }
          }
          transition={{
            opacity: {
              duration: FIGMA_TIMELINE * character.end,
              times: character.start
                ? [0, character.start / character.end, 1]
                : [0, 1],
              ease: character.start ? ["linear", EASE] : EASE,
            },
            x: { duration: FIGMA_TIMELINE * character.end, ease: EASE },
            y: {
              duration: FIGMA_TIMELINE * character.end,
              times: character.start
                ? [0, character.start / character.end, 1]
                : [0, 1],
              ease: character.start ? ["linear", EASE] : EASE,
            },
          }}
        >
          {character.letter}
        </motion.span>
      ))}
    </span>
  );
}

function Hero() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-[max(780px,100svh)] overflow-hidden bg-white max-[760px]:min-h-205"
      id="top"
      aria-labelledby="hero-title"
    >
      <Nav />

      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <span className="absolute inset-y-0 left-1/4 w-px bg-black/[0.07]" />
        <span className="absolute inset-y-0 left-1/2 w-px bg-black/[0.07]" />
        <span className="absolute inset-y-0 left-3/4 w-px bg-black/[0.07]" />
      </div>
      <h1
        className="pointer-events-none absolute inset-[13%_2.8%_3%] z-2 m-0 flex flex-col justify-between text-[clamp(5.5rem,16vw,16rem)] leading-[0.76] font-medium tracking-[-0.085em] max-[1100px]:text-[clamp(5.5rem,18vw,10rem)] max-[760px]:inset-[15%_18px_5%] max-[760px]:text-[clamp(4.7rem,24vw,8rem)] max-[760px]:leading-[0.82]"
        id="hero-title"
      >
        <motion.span
          className="self-start"
          data-node-id="1:642"
          initial={reduceMotion ? false : { opacity: 0, y: 84 }}
          animate={
            reduceMotion ? undefined : { opacity: [0, 0, 1], y: [84, 84, 0] }
          }
          transition={{
            opacity: {
              duration: FIGMA_TIMELINE * 0.0447,
              times: [0, 0.005 / 0.0447, 1],
              ease: ["linear", EASE],
            },
            y: {
              duration: FIGMA_TIMELINE * 0.0447,
              times: [0, 0.005 / 0.0447, 1],
              ease: ["linear", EASE],
            },
          }}
        >
          Precision
        </motion.span>
        <DeliveryWord />
      </h1>

      <motion.p
        className={`${MONO_LABEL} absolute top-[46%] left-[4vw] z-4 m-0 text-xs text-black/55 max-[760px]:hidden`}
        data-node-id="1:676"
        initial={reduceMotion ? false : { opacity: 0, y: 54 }}
        animate={
          reduceMotion ? undefined : { opacity: [0, 0, 1], y: [54, 54, 0] }
        }
        transition={{
          opacity: {
            duration: FIGMA_TIMELINE * 0.0397,
            times: [0, 0.0247 / 0.0397, 1],
            ease: ["linear", SOFT_EASE],
          },
          y: {
            duration: FIGMA_TIMELINE * 0.0397,
            times: [0, 0.0247 / 0.0397, 1],
            ease: ["linear", SOFT_EASE],
          },
        }}
      >
        // Since 2020
      </motion.p>

      <motion.div
        className="pointer-events-auto absolute top-[2%] left-[12%] z-3 h-[min(82vw,850px)] w-[min(76vw,1050px)] max-[760px]:top-[12%] max-[760px]:left-[-11%] max-[760px]:h-162.5 max-[760px]:w-[122vw]"
        data-node-id="1:653"
        initial={reduceMotion ? false : { scaleX: 0.8, scaleY: 0.8, y: -1677 }}
        animate={
          reduceMotion
            ? undefined
            : {
                scaleX: [0.8, 0.8, 1],
                scaleY: [0.8, 0.8, 1],
                y: [-1677, -1677, 0],
              }
        }
        transition={{
          scaleX: {
            duration: FIGMA_TIMELINE * 0.0495,
            times: [0, 0.005 / 0.0495, 1],
            ease: ["linear", EASE],
          },
          scaleY: {
            duration: FIGMA_TIMELINE * 0.0495,
            times: [0, 0.005 / 0.0495, 1],
            ease: ["linear", EASE],
          },
          y: {
            duration: FIGMA_TIMELINE * 0.0495,
            times: [0, 0.005 / 0.0495, 1],
            ease: ["linear", EASE],
          },
        }}
      >
        <img
          className="absolute inset-0 z-[-1] h-full w-full translate-y-[18%] object-contain opacity-35"
          src="/assets/cargo-shadow.svg"
          alt=""
        />
        <img
          className="absolute inset-0 h-full w-full object-contain transition-[opacity,transform,filter] duration-650 ease-[cubic-bezier(0.241,0,0.138,1)] motion-reduce:transition-none"
          src="/assets/cargo-primary.png"
          alt="A Setby freight container suspended from a crane"
        />
        <motion.img
          className="absolute inset-0 h-full w-full object-contain opacity-0 transition-[opacity,transform,filter] duration-650 ease-[cubic-bezier(0.241,0,0.138,1)] motion-reduce:transition-none"
          data-node-id="1:656"
          src="/assets/cargo-secondary.png"
          alt=""
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: [0, 0, 1] }}
          transition={{
            opacity: {
              duration: FIGMA_TIMELINE * 0.1486,
              times: [0, 0.1194 / 0.1486, 1],
              ease: ["linear", EASE],
            },
          }}
        />
      </motion.div>

      <div className="absolute bottom-[11%] left-[4vw] z-8 flex items-center gap-4.5 max-[760px]:bottom-[4%] max-[760px]:left-4.5">
        <motion.div
          data-node-id="1:671"
          initial={reduceMotion ? false : { scaleX: 0, scaleY: 0, y: 162.5 }}
          animate={
            reduceMotion
              ? undefined
              : {
                  scaleX: [0, 0, 1],
                  scaleY: [0, 0, 1],
                  y: [162.5, 162.5, 0],
                }
          }
          transition={{
            scaleX: {
              duration: FIGMA_TIMELINE * 0.0397,
              times: [0, 0.0149 / 0.0397, 1],
              ease: ["linear", EASE],
            },
            scaleY: {
              duration: FIGMA_TIMELINE * 0.0397,
              times: [0, 0.0149 / 0.0397, 1],
              ease: ["linear", EASE],
            },
            y: {
              duration: FIGMA_TIMELINE * 0.0397,
              times: [0, 0.0149 / 0.0397, 1],
              ease: ["linear", EASE],
            },
          }}
        >
          <a
            className={`${BUTTON} bg-[#ff5c32] text-white max-[760px]:max-w-52.5`}
            href="#contact"
          >
            Let&apos;s move your cargo <Arrow />
          </a>
        </motion.div>
        <motion.div
          data-node-id="1:696"
          initial={
            reduceMotion
              ? false
              : { rotate: -90, scaleX: 0.3, scaleY: 0.3, x: -361 }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: [-90, -90, 0],
                  scaleX: [0.3, 0.3, 1],
                  scaleY: [0.3, 0.3, 1],
                  x: [-361, -361, 0],
                }
          }
          transition={{
            duration: FIGMA_TIMELINE * 0.0397,
            times: [0, 0.0099 / 0.0397, 1],
            ease: ["linear", EASE],
          }}
        >
          <button
            className="group grid size-14.5 cursor-pointer place-items-center rounded-full border border-black/50 bg-white/52 p-0 backdrop-blur-md transition-[background-color,color,transform] duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] hover:scale-105 hover:rotate-12 hover:bg-[#0c0c0c] focus-visible:scale-105 focus-visible:rotate-12 focus-visible:bg-[#0c0c0c] motion-reduce:transition-none"
            type="button"
            aria-expanded={detailsOpen}
            aria-controls="cargo-details"
            onClick={() => setDetailsOpen((current) => !current)}
          >
            <img
              className="size-4.5 group-hover:invert group-focus-visible:invert"
              src="/assets/play-icon.svg"
              alt=""
            />
            <span className="sr-only">
              {detailsOpen ? "Hide" : "Show"} cargo details
            </span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {detailsOpen && (
          <motion.aside
            id="cargo-details"
            className="absolute bottom-[calc(11%+74px)] left-[4vw] z-9 w-[min(340px,86vw)] border border-black/12 bg-white/88 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.14)] backdrop-blur-[18px] max-[760px]:bottom-[14%] max-[760px]:left-4.5"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <span className={`${MONO_LABEL} text-[0.68rem] text-[#f4541a]`}>
              Live operations
            </span>
            <strong className="mt-3.5 mb-2 block text-[1.4rem] leading-[1.05]">
              One shipment. Every signal.
            </strong>
            <p className="m-0 text-[0.84rem] leading-[1.55] text-black/62">
              Milestones, documents, and exceptions stay visible from pickup
              through final delivery.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute top-[42%] right-[4vw] z-7 flex flex-col gap-6.5 text-right max-[1100px]:top-1/2 max-[760px]:top-[57%] max-[760px]:right-4.5 max-[760px]:left-4.5 max-[760px]:flex-row max-[760px]:justify-between max-[760px]:gap-1.5 max-[760px]:text-left"
        data-node-id="1:677"
        aria-label="Company statistics"
        initial={reduceMotion ? false : { opacity: 0, rowGap: "142px", x: 365 }}
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0, 0, 1],
                rowGap: ["142px", "142px", "45px"],
                x: [365, 365, 0],
              }
        }
        transition={{
          duration: FIGMA_TIMELINE * 0.0397,
          times: [0, 0.0099 / 0.0397, 1],
          ease: ["linear", EASE],
        }}
      >
        {stats.map(([number, label]) => (
          <div
            className="flex flex-col max-[760px]:min-w-0 max-[760px]:bg-white/72 max-[760px]:px-2 max-[760px]:py-1.75 max-[760px]:backdrop-blur-sm"
            key={number}
          >
            <strong className="text-[clamp(2.1rem,4vw,4rem)] leading-[0.95] font-medium tracking-[-0.06em] max-[760px]:text-[1.55rem]">
              {number}
            </strong>
            <span className="text-xs text-black/58 max-[760px]:max-w-19 max-[760px]:text-[0.58rem]">
              {label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.article
        className="absolute top-[18%] right-[4vw] z-7 h-36.25 w-55 overflow-hidden rounded bg-[#ebeaea] shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.241,0,0.138,1)] transform-3d hover:shadow-[0_24px_74px_rgba(0,0,0,0.2)] motion-reduce:transition-none max-[1100px]:top-[15%] max-[760px]:hidden"
        data-node-id="1:687"
        initial={
          reduceMotion ? false : { scaleX: 0.58, scaleY: 0.58, x: 410.32 }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                scaleX: [0.58, 0.58, 1],
                scaleY: [0.58, 0.58, 1],
                x: [410.32, 410.32, 0],
              }
        }
        transition={{
          duration: FIGMA_TIMELINE * 0.0348,
          times: [0, 0.0099 / 0.0348, 1],
          ease: ["linear", EASE],
        }}
      >
        <img
          className="absolute inset-y-0 right-0 h-full w-[55%] object-cover"
          src="/assets/logistics-card.jpg"
          alt="Setby logistics team member"
        />
        <div className="absolute inset-y-0 right-[40%] left-0 z-2 flex flex-col justify-end gap-2 bg-[#ebeaea] px-3 py-4 [clip-path:polygon(0_0,63%_0,100%_100%,0_100%)]">
          <span className="mb-auto grid h-6 w-7 place-items-center bg-[#ff5c32] text-[0.7rem] font-bold text-white">
            S
          </span>
          <strong className="w-20 text-[0.76rem] leading-[1.15]">
            Logistics excellence
          </strong>
          <span className="w-19 text-[0.55rem] text-black/52">
            A portfolio of happy customers
          </span>
        </div>
      </motion.article>
    </section>
  );
}

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="grid min-h-[86svh] place-items-center bg-[#ff5c32] text-white max-[760px]:min-h-[74svh]"
      id="about"
      aria-labelledby="about-title"
    >
      <div
        className={`${SECTION_SHELL} flex flex-col items-center py-30 text-center max-[760px]:py-22.5`}
      >
        <Reveal className={`${SECTION_LABEL} text-white`}>
          <span className="block h-6.5 w-2.5 skew-y-[-38deg] bg-current" />
          About Setby
        </Reveal>
        <motion.div
          data-node-id="1:705"
          initial={
            reduceMotion ? false : { opacity: 0, filter: "blur(10.5px)" }
          }
          whileInView={
            reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }
          }
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            opacity: {
              duration: FIGMA_TIMELINE * (0.1487 - 0.1078),
              ease: EASE,
            },
            filter: {
              duration: FIGMA_TIMELINE * (0.1487 - 0.1078),
              ease: "linear",
            },
          }}
        >
          <h2
            className="mx-auto mt-14.5 mb-16.5 max-w-312.5 text-[clamp(2.6rem,5.8vw,6.8rem)] leading-[0.94] font-medium tracking-[-0.055em] max-[760px]:mt-10.5 max-[760px]:mb-12.5 max-[760px]:text-[clamp(2.5rem,11vw,4.6rem)]"
            id="about-title"
          >
            We bring logistics to life through craft and innovation. Trusted by
            teams who demand precision, speed, and care.
          </h2>
        </motion.div>
        <motion.div
          data-node-id="1:706"
          initial={reduceMotion ? false : { scaleX: 0, scaleY: 0 }}
          whileInView={reduceMotion ? undefined : { scaleX: 1, scaleY: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: FIGMA_TIMELINE * (0.1487 - 0.1177),
            ease: EASE,
          }}
        >
          <a className={`${BUTTON} bg-[#0c0c0c] text-white`} href="#mission">
            Who we are <Arrow />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Mission() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="bg-[#f8f7f3] pt-37.5 pb-25 max-[760px]:pt-22.5"
      id="mission"
      aria-labelledby="mission-title"
    >
      <div className={SECTION_SHELL}>
        <div className="grid grid-cols-[1fr_0.7fr_2.25fr] items-start gap-[4vw] max-[1100px]:grid-cols-[0.8fr_2fr] max-[760px]:grid-cols-1">
          <Reveal className={SECTION_LABEL}>
            <span className="block h-6.5 w-2.5 skew-y-[-38deg] bg-current" />
            Mission
          </Reveal>
          <Reveal
            className={`${MONO_LABEL} max-w-30 text-[0.9rem] leading-[1.2] font-(--font-manrope) normal-case max-[1100px]:hidden`}
            delay={0.06}
          >
            What is Setby
          </Reveal>
          <Reveal delay={0.12} amount={0.25}>
            <h2
              className="m-0 text-[clamp(2rem,3.2vw,3.65rem)] leading-[1.12] font-normal tracking-[-0.04em] text-black/62 max-[760px]:mt-8.5"
              id="mission-title"
            >
              At <em className="font-semibold text-[#0c0c0c] italic">Setby</em>,
              we&apos;re on a mission to bring clarity into every route—like
              sunlight breaking through a window.
            </h2>
          </Reveal>
        </div>

        <div
          className="relative mt-32.5 min-h-190 overflow-hidden border border-black/22 bg-[radial-gradient(circle_at_center,rgba(255,92,50,0.12),transparent_36%)] max-[1100px]:min-h-170 max-[760px]:mt-18.75 max-[760px]:min-h-177.5"
          aria-label="Setby service benefits"
        >
          <span
            className="absolute top-0 left-1/2 h-full w-px bg-black/22"
            aria-hidden="true"
          />
          <span
            className="absolute top-1/2 left-0 h-px w-full bg-black/22"
            aria-hidden="true"
          />
          <div
            className="absolute top-1/2 left-1/2 aspect-square w-105 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ff5c32]/45 max-[760px]:w-65"
            aria-hidden="true"
          >
            <span className="absolute top-[23%] left-[7%] size-2.25 rounded-full bg-[#ff5c32]" />
            <span className="absolute top-[26%] right-[8%] size-2.25 rounded-full bg-[#ff5c32]" />
            <span className="absolute -bottom-1 left-1/2 size-2.25 rounded-full bg-[#ff5c32]" />
          </div>
          <motion.img
            className="absolute top-1/2 left-[calc(50%-215px)] z-2 w-107.5 drop-shadow-[0_26px_36px_rgba(0,0,0,0.16)] max-[760px]:left-[calc(50%-140px)] max-[760px]:w-70"
            src="/assets/cargo-secondary.png"
            alt=""
            initial={
              reduceMotion ? false : { opacity: 0, scale: 0.72, rotate: -4 }
            }
            whileInView={
              reduceMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }
            }
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          {features.map((feature, index) => (
            <motion.div
              className={`${FEATURE} ${feature.position}`}
              key={feature.label}
              data-node-id={["1:719", "1:720", "1:721", "1:722"][index]}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.4 }}
            >
              <motion.div
                className={`flex items-center gap-5 max-[760px]:gap-2 ${feature.reverse ? "flex-row-reverse text-right" : ""}`}
                variants={{
                  hidden: { opacity: 0, x: 135 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{
                  duration: FIGMA_TIMELINE * (0.2977 - 0.258),
                  delay: index * 0.04,
                  ease: EASE,
                }}
              >
                <img
                  className="max-h-27.5 w-19 max-[760px]:w-10.5"
                  src={feature.route}
                  alt=""
                />
                <span>{feature.label}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  nodeId,
  hrefLabel,
  image,
  imageAlt,
  index,
  title,
  meta,
  tall,
  scale,
  duration,
}: {
  nodeId: string;
  hrefLabel: string;
  image: string;
  imageAlt: string;
  index: string;
  title: string;
  meta: string;
  tall?: boolean;
  scale: number;
  duration: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="group"
      data-node-id={nodeId}
      initial={reduceMotion ? false : { scaleX: 1 / scale, scaleY: 1 / scale }}
      whileInView={reduceMotion ? undefined : { scaleX: 1, scaleY: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, ease: EASE }}
    >
      <a className="block" href="#services" aria-label={hrefLabel}>
        <div
          className={`relative overflow-hidden bg-[#ddd] ${tall ? "aspect-[0.75]" : "aspect-[1.35] max-[760px]:aspect-square"}`}
        >
          <img
            className="h-full w-full object-cover transition-[transform,filter] duration-700 ease-[cubic-bezier(0.241,0,0.138,1)] group-focus-within:scale-[1.045] group-focus-within:saturate-[1.12] group-hover:scale-[1.045] group-hover:saturate-[1.12] motion-reduce:transition-none"
            src={image}
            alt={imageAlt}
          />
          <span className="absolute top-4.5 right-4.5 grid size-11 place-items-center bg-white/90 text-[0.72rem] font-(--font-chivo-mono) transition-[color,background-color,transform] duration-300 ease-[cubic-bezier(0.241,0,0.138,1)] group-focus-within:rotate-6 group-focus-within:bg-[#ff5c32] group-focus-within:text-white group-hover:rotate-6 group-hover:bg-[#ff5c32] group-hover:text-white motion-reduce:transition-none">
            {index}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-6 pt-4.5 max-[760px]:flex-col max-[760px]:gap-1.5">
          <strong className="text-xl tracking-[-0.03em]">{title}</strong>
          <span className="text-[0.7rem] font-(--font-chivo-mono) text-black/52 uppercase">
            {meta}
          </span>
        </div>
      </a>
    </motion.div>
  );
}

function Projects() {
  return (
    <section
      className="bg-white py-35 max-[760px]:pt-22.5"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className={SECTION_SHELL}>
        <Reveal className={SECTION_LABEL}>
          <span className="block h-6.5 w-2.5 skew-y-[-38deg] bg-current" />
          Featured projects
        </Reveal>
        <div className="mt-16 grid grid-cols-[1fr_auto] items-end gap-12.5 max-[760px]:mt-10.5 max-[760px]:grid-cols-1 max-[760px]:items-start">
          <Reveal amount={0.25}>
            <h2
              className="m-0 max-w-257.5 text-[clamp(3rem,6vw,7rem)] leading-[0.94] font-medium tracking-[-0.065em]"
              id="projects-title"
            >
              Every route tells its own story of collaboration and performance.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <a className={`${BUTTON} bg-[#0c0c0c] text-white`} href="#services">
              Explore services <Arrow />
            </a>
          </Reveal>
        </div>

        <div className="mt-25 grid grid-cols-[0.82fr_1.18fr] items-end gap-6 max-[760px]:mt-17 max-[760px]:grid-cols-1 max-[760px]:gap-14.5">
          <ProjectCard
            nodeId="1:784"
            hrefLabel="View global freight project"
            image="/assets/project-one.jpg"
            imageAlt="Orange freight containers against a dark sky"
            index="01"
            title="Atlantic freight corridor"
            meta="Global freight · 2025"
            tall
            scale={70.75}
            duration={FIGMA_TIMELINE * (0.4858 - 0.4464)}
          />
          <ProjectCard
            nodeId="1:785"
            hrefLabel="View connected cargo project"
            image="/assets/project-two.jpg"
            imageAlt="Freight containers moving through a busy terminal"
            index="02"
            title="Night-shift cargo connect"
            meta="Express delivery · 2026"
            scale={64.1}
            duration={FIGMA_TIMELINE * (0.5359 - 0.496)}
          />
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [activeService, setActiveService] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="bg-[#f8f7f3] pt-35 pb-45 max-[760px]:pt-22.5 max-[760px]:pb-27.5"
      id="services"
      aria-labelledby="services-title"
    >
      <div className={SECTION_SHELL}>
        <Reveal className="mb-22.5 grid grid-cols-[1fr_2fr] items-start gap-12.5 max-[760px]:mb-13.5 max-[760px]:grid-cols-1">
          <span className={SECTION_LABEL}>
            <span className="block h-6.5 w-2.5 skew-y-[-38deg] bg-current" />
            Our services
          </span>
          <h2
            className="m-0 max-w-195 text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.95] font-medium tracking-[-0.06em] max-[760px]:mt-7"
            id="services-title"
          >
            Built around the way your cargo actually moves.
          </h2>
        </Reveal>
        <div className="border-b border-black/35">
          {services.map((service, index) => {
            const active = activeService === index;
            return (
              <motion.article
                className={`border-t transition-[background-color,border-color] duration-400 ease-[cubic-bezier(0.241,0,0.138,1)] motion-reduce:transition-none ${active ? "border-[#0c0c0c] bg-white" : "border-black/30"}`}
                key={service.title}
                data-node-id={["1:737", "1:749", "1:761", "1:773"][index]}
                initial={
                  reduceMotion ? false : { opacity: index === 0 ? 1 : 0.4 }
                }
                whileInView={reduceMotion ? undefined : { opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{
                  duration: FIGMA_TIMELINE * (0.5358 - 0.4959),
                  delay: index * 0.06,
                  ease: EASE,
                }}
              >
                <button
                  className={`group grid min-h-35.5 w-full cursor-pointer grid-cols-[minmax(240px,1fr)_minmax(360px,1.5fr)_42px] items-center gap-11 border-0 bg-transparent py-7.5 pr-5.5 pl-0 text-left transition-[color,padding] duration-350 ease-[cubic-bezier(0.241,0,0.138,1)] hover:pl-5.5 hover:text-[#0c0c0c] focus-visible:pl-5.5 focus-visible:text-[#0c0c0c] motion-reduce:transition-none max-[1100px]:grid-cols-[1fr_1.2fr_36px] max-[1100px]:gap-6 max-[760px]:min-h-0 max-[760px]:grid-cols-[1fr_30px] max-[760px]:gap-4.5 max-[760px]:py-7 max-[760px]:pr-0 max-[760px]:hover:pl-3 max-[760px]:focus-visible:pl-3 ${active ? "pl-5.5 text-[#0c0c0c] max-[760px]:pl-3" : "text-black/40"}`}
                  type="button"
                  aria-expanded={active}
                  aria-controls={`service-${index}`}
                  onClick={() => setActiveService(index)}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                >
                  <strong className="text-[clamp(1.8rem,3vw,3.2rem)] font-medium tracking-[-0.045em]">
                    {service.title}
                  </strong>
                  <span className="flex flex-wrap gap-2.5 max-[760px]:col-span-full max-[760px]:row-start-2">
                    {service.tags.map((tag) => (
                      <span
                        className="rounded-full border border-current px-3.5 py-2.5 text-[0.67rem] leading-none font-(--font-chivo-mono) uppercase"
                        key={tag}
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="max-[760px]:col-start-2 max-[760px]:row-start-1">
                    <Arrow />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      className="overflow-hidden"
                      id={`service-${index}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.42, ease: EASE }}
                    >
                      <p className="mr-0 mb-9 ml-[calc(40%+22px)] max-w-172.5 text-base leading-[1.6] text-black/64 max-[760px]:mx-4 max-[760px]:mb-7">
                        {service.copy}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative min-h-svh overflow-hidden bg-[#a7dcf4] text-white max-[760px]:min-h-215"
      id="contact"
      aria-labelledby="contact-title"
    >
      <img
        className="absolute inset-0 h-full w-full object-cover max-[760px]:object-[45%_center]"
        src="/assets/closing-background.webp"
        alt="Sunset above the sea"
      />
      <div
        className="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08),transparent_46%,rgba(12,12,12,0.28))]"
        aria-hidden="true"
      />
      <motion.div
        className="absolute top-[-4vw] left-[-1vw] z-2 text-[clamp(9rem,36vw,38rem)] leading-[0.8] font-semibold tracking-[-0.09em] text-white/90 max-[760px]:top-[3%] max-[760px]:text-[42vw]"
        data-node-id="1:789"
        initial={
          reduceMotion ? false : { scaleX: 0.3, scaleY: 0.3, y: 298.238 }
        }
        whileInView={reduceMotion ? undefined : { scaleX: 1, scaleY: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          duration: FIGMA_TIMELINE * (0.6349 - 0.5854),
          ease: EASE,
        }}
      >
        Setby.
      </motion.div>
      <motion.img
        className="absolute inset-x-0 bottom-0 z-3 h-full w-full object-[center_bottom] min-[1200px]:h-full max-[760px]:h-full max-[760px]:object-[60%_bottom] lg:top-17"
        data-node-id="1:790"
        src="/assets/closing-foreground.webp"
        alt="Orange Setby shipping containers"
        initial={reduceMotion ? false : { y: 313.675 }}
        whileInView={reduceMotion ? undefined : { y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{
          duration: FIGMA_TIMELINE * (0.6349 - 0.5855),
          ease: EASE,
        }}
      />
      <Reveal
        className="absolute top-[calc(50%-155px)] left-[max(8vw,calc(50%-280px))] z-7 w-[min(560px,84vw)] border border-white/64 bg-white/78 p-8 text-[#0c0c0c] shadow-[0_28px_90px_rgba(55,38,18,0.2)] backdrop-blur-[18px] max-[760px]:top-[calc(47%-145px)] max-[760px]:left-4.5 max-[760px]:p-6"
        delay={0.18}
        amount={0.4}
      >
        <p
          className={`${MONO_LABEL} mt-0 mb-4.5 text-[0.72rem] text-[#f4541a]`}
        >
          Ready when you are
        </p>
        <h2
          className="mt-0 mb-7 text-[clamp(2.8rem,5vw,5rem)] leading-[0.9] tracking-[-0.07em]"
          id="contact-title"
        >
          Let&apos;s deliver what&apos;s next.
        </h2>
        <a
          className={`${BUTTON} bg-white/95 text-[#f4541a]`}
          href="mailto:hello@setby.example"
        >
          Talk to us <Arrow />
        </a>
      </Reveal>
      <footer className="absolute right-[4vw] bottom-6 left-[4vw] z-8 grid grid-cols-[1fr_auto_1fr] items-center gap-6 text-xs max-[760px]:right-4.5 max-[760px]:left-4.5 max-[760px]:grid-cols-[1fr_auto]">
        <a className="inline-flex w-fit" href="#top">
          <Brand inverted />
        </a>
        <p className={`${MONO_LABEL} m-0 max-[760px]:hidden`}>
          Enhanced logistics, built for motion.
        </p>
        <a
          className="justify-self-end border-b border-current py-2"
          href="#top"
        >
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main className="[-webkit-tap-highlight-color:transparent] [&_a]:no-underline [&_a:focus-visible]:outline-[3px] [&_a:focus-visible]:outline-offset-4 [&_a:focus-visible]:outline-[#2457ff] [&_button]:font-[inherit] [&_button:focus-visible]:outline-[3px] [&_button:focus-visible]:outline-offset-4 [&_button:focus-visible]:outline-[#2457ff]">
      <OpeningIntro />
      <Hero />
      <About />
      <Mission />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
