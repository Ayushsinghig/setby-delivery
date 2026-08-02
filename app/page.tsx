"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

const EASE = [0.241, 0, 0.138, 1] as const;
const SOFT_EASE = [0.284, 0.009, 0.138, 1] as const;
const FIGMA_TIMELINE = 27.164;
const INTRO_TIMELINE = FIGMA_TIMELINE * 2.25;
const INTRO_DISMISS_DELAY = 3200;

const introPanels = [
  {
    nodeId: "1:801",
    className: "intro-cap intro-cap-left",
    end: 0.0199,
    ease: SOFT_EASE,
  },
  {
    nodeId: "1:800",
    className: "intro-panel intro-panel-one",
    end: 0.0248,
    ease: EASE,
  },
  {
    nodeId: "1:802",
    className: "intro-panel intro-panel-two",
    end: 0.0297,
    ease: EASE,
  },
  {
    nodeId: "1:803",
    className: "intro-panel intro-panel-three",
    end: 0.0349,
    ease: EASE,
  },
  {
    nodeId: "1:804",
    className: "intro-panel intro-panel-four",
    end: 0.0399,
    ease: EASE,
  },
  {
    nodeId: "1:805",
    className: "intro-cap intro-cap-right",
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
  ["On-time delivery", "/assets/route-a.svg", "feature feature-a"],
  ["Guaranteed security", "/assets/route-b.svg", "feature feature-b"],
  ["Real-time tracking", "/assets/route-c.svg", "feature feature-c"],
  ["24/7 support", "/assets/route-d.svg", "feature feature-d"],
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
    <span className="arrow" aria-hidden="true">
      <span />
    </span>
  );
}

function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={`brand ${inverted ? "brand-inverted" : ""}`}
      aria-label="Setby home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <img src="/assets/logo-mark-a.svg" alt="" />
        <img src="/assets/logo-mark-b.svg" alt="" />
        <img src="/assets/logo-type.svg" alt="" />
      </span>
      <span className="brand-name">Setby.</span>
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
        <div className="opening-intro" aria-hidden="true">
          {introPanels.map((panel) => (
            <motion.div
              className={panel.className}
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

          <div className="intro-content-position">
            <motion.div
              className="intro-content"
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
              <div className="intro-lockup">
                <img
                  data-node-id="1:807"
                  src="/assets/intro-mark-a.svg"
                  alt=""
                />
                <img
                  data-node-id="1:808"
                  src="/assets/intro-mark-b.svg"
                  alt=""
                />
                <span className="intro-type" data-node-id="1:809">
                  <img src="/assets/intro-mark-type.svg" alt="" />
                  <strong data-node-id="1:810">Setby.</strong>
                </span>
              </div>
              <p data-node-id="1:811">Enhanced Logistics</p>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);

  return (
    <motion.header
      className="site-header"
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
      <a className="brand-link" href="#top" onClick={close}>
        <Brand />
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#about">About us</a>
        <a href="#services">Services</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <a className="button button-dark header-cta" href="#contact">
        Contact us <Arrow />
      </a>

      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <a href="#about" onClick={close}>
              About us
            </a>
            <a href="#services" onClick={close}>
              Services
            </a>
            <a href="#projects" onClick={close}>
              Projects
            </a>
            <a href="#contact" onClick={close}>
              Contact
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function DeliveryWord() {
  const reduceMotion = useReducedMotion();
  const characters = [
    { letter: "D", nodeId: "1:644", start: 0, end: 0.0223, x: 0 },
    { letter: "e", nodeId: "1:645", start: 0.002, end: 0.0243, x: -21 },
    { letter: "l", nodeId: "1:646", start: 0.004, end: 0.0263, x: -36 },
    { letter: "i", nodeId: "1:647", start: 0.006, end: 0.0283, x: -54 },
    { letter: "v", nodeId: "1:648", start: 0.0079, end: 0.0303, x: -65 },
    { letter: "e", nodeId: "1:649", start: 0.0099, end: 0.0322, x: -90 },
    { letter: "r", nodeId: "1:650", start: 0.0119, end: 0.0342, x: -107 },
    { letter: "y", nodeId: "1:651", start: 0.0139, end: 0.0362, x: -104 },
  ];

  return (
    <span className="delivery-word" aria-label="Delivery">
      {characters.map((character) => (
        <motion.span
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
    <section className="hero" id="top" aria-labelledby="hero-title">
      <Nav />

      <div className="hero-grid" aria-hidden="true" />
      <h1 className="hero-title" id="hero-title">
        <motion.span
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
        className="eyebrow since"
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
        className="cargo-visual"
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
        <img className="cargo-shadow" src="/assets/cargo-shadow.svg" alt="" />
        <img
          className="cargo-image cargo-primary"
          src="/assets/cargo-primary.png"
          alt="A Setby freight container suspended from a crane"
        />
        <motion.img
          className="cargo-image cargo-secondary"
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

      <div className="hero-actions">
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
          <a className="button button-orange" href="#contact">
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
            className="round-action"
            type="button"
            aria-expanded={detailsOpen}
            aria-controls="cargo-details"
            onClick={() => setDetailsOpen((current) => !current)}
          >
            <img src="/assets/play-icon.svg" alt="" />
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
            className="cargo-details"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.38, ease: EASE }}
          >
            <span className="eyebrow">Live operations</span>
            <strong>One shipment. Every signal.</strong>
            <p>
              Milestones, documents, and exceptions stay visible from pickup
              through final delivery.
            </p>
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.div
        className="stats"
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
          <div className="stat" key={number}>
            <strong>{number}</strong>
            <span>{label}</span>
          </div>
        ))}
      </motion.div>

      <motion.article
        className="proof-card"
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
          src="/assets/logistics-card.jpg"
          alt="Setby logistics team member"
        />
        <div className="proof-card-copy">
          <span className="proof-mark">S</span>
          <strong>Logistics excellence</strong>
          <span>A portfolio of happy customers</span>
        </div>
      </motion.article>
    </section>
  );
}

function About() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="about section-orange"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="section-shell about-inner">
        <Reveal className="section-label section-label-light">
          <span className="label-slash" /> About Setby
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
          <h2 id="about-title">
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
          <a className="button button-dark" href="#mission">
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
    <section className="mission" id="mission" aria-labelledby="mission-title">
      <div className="section-shell">
        <div className="mission-intro">
          <Reveal className="section-label">
            <span className="label-slash" /> Mission
          </Reveal>
          <Reveal className="mission-kicker" delay={0.06}>
            What is Setby
          </Reveal>
          <Reveal className="mission-copy" delay={0.12} amount={0.25}>
            <h2 id="mission-title">
              At <em>Setby</em>, we&apos;re on a mission to bring clarity into
              every route—like sunlight breaking through a window.
            </h2>
          </Reveal>
        </div>

        <div className="feature-map" aria-label="Setby service benefits">
          <div className="feature-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <motion.img
            className="feature-cargo"
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
          {features.map(([label, route, className], index) => (
            <motion.div
              className={className}
              key={label}
              data-node-id={["1:719", "1:720", "1:721", "1:722"][index]}
              initial={reduceMotion ? false : { opacity: 0, x: 135 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: FIGMA_TIMELINE * (0.2977 - 0.258),
                delay: index * 0.04,
                ease: EASE,
              }}
            >
              <img src={route} alt="" />
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="projects"
      id="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-shell">
        <Reveal className="section-label">
          <span className="label-slash" /> Featured projects
        </Reveal>
        <div className="projects-heading">
          <Reveal amount={0.25}>
            <h2 id="projects-title">
              Every route tells its own story of collaboration and performance.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <a className="button button-dark" href="#services">
              Explore services <Arrow />
            </a>
          </Reveal>
        </div>

        <div className="project-grid">
          <motion.div
            className="project-card project-card-tall"
            data-node-id="1:784"
            initial={
              reduceMotion ? false : { scaleX: 1 / 70.75, scaleY: 1 / 70.75 }
            }
            whileInView={reduceMotion ? undefined : { scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: FIGMA_TIMELINE * (0.4858 - 0.4464),
              ease: EASE,
            }}
          >
            <a href="#services" aria-label="View global freight project">
              <div className="project-image-wrap">
                <img
                  src="/assets/project-one.jpg"
                  alt="Orange freight containers against a dark sky"
                />
                <span className="project-index">01</span>
              </div>
              <div className="project-meta">
                <strong>Atlantic freight corridor</strong>
                <span>Global freight · 2025</span>
              </div>
            </a>
          </motion.div>
          <motion.div
            className="project-card project-card-wide"
            data-node-id="1:785"
            initial={
              reduceMotion ? false : { scaleX: 1 / 64.1, scaleY: 1 / 64.1 }
            }
            whileInView={reduceMotion ? undefined : { scaleX: 1, scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: FIGMA_TIMELINE * (0.5359 - 0.496),
              ease: EASE,
            }}
          >
            <a href="#services" aria-label="View connected cargo project">
              <div className="project-image-wrap">
                <img
                  src="/assets/project-two.jpg"
                  alt="Freight containers moving through a busy terminal"
                />
                <span className="project-index">02</span>
              </div>
              <div className="project-meta">
                <strong>Night-shift cargo connect</strong>
                <span>Express delivery · 2026</span>
              </div>
            </a>
          </motion.div>
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
      className="services"
      id="services"
      aria-labelledby="services-title"
    >
      <div className="section-shell">
        <Reveal className="services-header">
          <span className="section-label">
            <span className="label-slash" /> Our services
          </span>
          <h2 id="services-title">
            Built around the way your cargo actually moves.
          </h2>
        </Reveal>
        <div className="service-list">
          {services.map((service, index) => {
            const active = activeService === index;
            return (
              <motion.article
                className={`service-row ${active ? "active" : ""}`}
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
                  type="button"
                  aria-expanded={active}
                  aria-controls={`service-${index}`}
                  onClick={() => setActiveService(index)}
                  onMouseEnter={() => setActiveService(index)}
                  onFocus={() => setActiveService(index)}
                >
                  <strong>{service.title}</strong>
                  <span className="service-tags">
                    {service.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                  <Arrow />
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      className="service-copy"
                      id={`service-${index}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        reduceMotion ? undefined : { height: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.42, ease: EASE }}
                    >
                      <p>{service.copy}</p>
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
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <img
        className="contact-sky"
        src="/assets/closing-background.webp"
        alt="Sunset above the sea"
      />
      <motion.div
        className="contact-word"
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
        className="contact-containers"
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
      <Reveal className="contact-cta" delay={0.18} amount={0.4}>
        <p className="eyebrow">Ready when you are</p>
        <h2 id="contact-title">Let&apos;s deliver what&apos;s next.</h2>
        <a className="button button-light" href="mailto:hello@setby.example">
          Talk to us <Arrow />
        </a>
      </Reveal>
      <footer className="site-footer">
        <a href="#top">
          <Brand inverted />
        </a>
        <p>Enhanced logistics, built for motion.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}

export default function Home() {
  return (
    <main>
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
