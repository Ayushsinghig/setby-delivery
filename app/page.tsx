"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";

const EASE = [0.241, 0, 0.138, 1] as const;

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

function Nav() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  const close = () => setOpen(false);

  return (
    <header className="site-header">
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
    </header>
  );
}

function DeliveryWord() {
  const reduceMotion = useReducedMotion();
  return (
    <span className="delivery-word" aria-label="Delivery">
      {"Delivery".split("").map((letter, index) => (
        <motion.span
          aria-hidden="true"
          key={`${letter}-${index}`}
          initial={
            reduceMotion ? false : { opacity: 0, y: 32, x: index ? -12 : 0 }
          }
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.62,
            delay: 0.16 + index * 0.045,
            ease: EASE,
          }}
        >
          {letter}
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
          initial={reduceMotion ? false : { opacity: 0, y: 84 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.12, ease: EASE }}
        >
          Precision
        </motion.span>
        <DeliveryWord />
      </h1>

      <p className="eyebrow since">// Since 2020</p>

      <motion.div
        className="cargo-visual"
        initial={reduceMotion ? false : { opacity: 0, y: -80, scale: 0.84 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.15, delay: 0.22, ease: EASE }}
      >
        <img className="cargo-shadow" src="/assets/cargo-shadow.svg" alt="" />
        <img
          className="cargo-image cargo-primary"
          src="/assets/cargo-primary.png"
          alt="A Setby freight container suspended from a crane"
        />
        <img
          className="cargo-image cargo-secondary"
          src="/assets/cargo-secondary.png"
          alt=""
        />
        <span className="cargo-hint">Hover to recolour</span>
      </motion.div>

      <div className="hero-actions">
        <a className="button button-orange" href="#contact">
          Let&apos;s move your cargo <Arrow />
        </a>
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

      <div className="stats" aria-label="Company statistics">
        {stats.map(([number, label], index) => (
          <motion.div
            className="stat"
            key={number}
            initial={reduceMotion ? false : { opacity: 0, x: 80, rowGap: 30 }}
            animate={{ opacity: 1, x: 0, rowGap: 4 }}
            transition={{
              duration: 0.75,
              delay: 0.32 + index * 0.1,
              ease: EASE,
            }}
          >
            <strong>{number}</strong>
            <span>{label}</span>
          </motion.div>
        ))}
      </div>

      <motion.article
        className="proof-card"
        initial={reduceMotion ? false : { opacity: 0, x: 120, scale: 0.72 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
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
        <Reveal delay={0.08} amount={0.25}>
          <h2 id="about-title">
            We bring logistics to life through craft and innovation. Trusted by
            teams who demand precision, speed, and care.
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <a className="button button-dark" href="#mission">
            Who we are <Arrow />
          </a>
        </Reveal>
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
            <Reveal
              className={className}
              delay={0.08 * index}
              key={label}
              amount={0.4}
            >
              <img src={route} alt="" />
              <span>{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
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
          <Reveal className="project-card project-card-tall" amount={0.25}>
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
          </Reveal>
          <Reveal
            className="project-card project-card-wide"
            delay={0.1}
            amount={0.25}
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
          </Reveal>
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
                initial={reduceMotion ? false : { opacity: 0, y: 38 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.68, delay: index * 0.05, ease: EASE }}
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
      <Reveal className="contact-word" amount={0.3}>
        Setby.
      </Reveal>
      <motion.img
        className="contact-containers"
        src="/assets/closing-foreground.webp"
        alt="Orange Setby shipping containers"
        initial={reduceMotion ? false : { opacity: 0, y: 120 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: 1.05, ease: EASE }}
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
      <Hero />
      <About />
      <Mission />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
