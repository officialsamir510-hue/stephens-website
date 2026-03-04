import { useRef, useState, useEffect, useCallback } from "react";

const experiences = [
  {
    company: "Beal Bank Texas & Beal Bank USA",
    role: "President",
    period: "Oct 2023 – Sep 2025",
    desc: "Successfully managed $23 billion banks through the complex regulatory environment following the collapse of SVB and Signature Bank.",
    achievements: [
      "Managed $23B banks through post-SVB regulatory challenges",
      "Revamped governance and board structure",
      "Launched digital banking under 'Better by Beal'",
      "Explored stablecoins, BTC lending & custody",
      "Completed divestiture and transition into Monet Bank",
      "Achieved all regulatory and shareholder goals",
    ],
  },
  {
    company: "Endurance Advisory Partners",
    role: "Founder & CEO",
    period: "Jan 2009 – Present",
    desc: "Built boutique consultancy of 12 senior consultants delivering strategic, regulatory, and operational advice with $30M+ revenue since formation.",
    achievements: [
      "Advised over 70 clients including banks and fintechs",
      "Led community bank M&A transactions",
      "Authored articles on digital banking, AI, and blockchain",
      "Partnered with leading national law firms",
    ],
  },
  {
    company: "Gateway First Bank",
    role: "Chief Executive Officer",
    period: "Jan 2018 – May 2020",
    desc: "Led 2.5-year transformation converting top-100 national mortgage platform into a $2 billion state-chartered bank with $107M annual earnings — 4× the mortgage company's peak.",
    achievements: [
      "Acquired and integrated $300M community bank",
      "Doubled mortgage origination to $12B annually",
      "Completed capital raise with Piper Sandler & EJF Capital",
      "Launched digital banking during COVID in 48 hours",
      "Restructured governance with former FDIC Chairman on board",
    ],
  },
  {
    company: "Bank of America",
    role: "Various Executive Roles",
    period: "1986 – 2008",
    desc: "22 years in leadership across Wealth Management, Corporate & Investment Banking, Finance, Technology & Corporate M&A as bank grew from $25B to $1 trillion in assets.",
    achievements: [
      "Led M&A for Fleet, US Trust, LaSalle, Merrill Lynch acquisitions",
      "COO of Corporate & Investment Banking — grew revenue $1.3B+",
      "Launched Private Client Group for advisory services",
      "Developed M&A integration playbook used for all acquisitions",
      "CFO & COO of Corporate Banking — built client management model",
    ],
  },
];

export default function WorkSection() {
  const sRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Header reveal
  useEffect(() => {
    const el = sRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="experience" ref={sRef} style={{
      background: "var(--bg)",
      padding: "clamp(80px,12vh,140px) clamp(24px,6vw,96px)",
      position: "relative",
      overflow: "hidden",
      borderTop: "1px solid var(--border)",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "clamp(24px,4vh,40px)",
        opacity: headerVisible ? 1 : 0,
        transform: headerVisible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity .8s ease, transform .8s ease",
      }}>
        <div style={{
          width: "32px",
          height: "2px",
          background: "var(--primary)",
          borderRadius: "1px",
          transform: headerVisible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .8s ease .2s",
        }} />
        <span className="section-tag">Experience</span>
      </div>

      <h2 style={{
        fontFamily: "'Playfair Display',serif",
        fontSize: "clamp(36px,5vw,48px)",
        fontWeight: 700,
        lineHeight: 1.15,
        color: "var(--headline)",
        marginBottom: "clamp(48px,8vh,80px)",
        maxWidth: "600px",
        transform: headerVisible ? "translateY(0)" : "translateY(24px)",
        opacity: headerVisible ? 1 : 0,
        transition: "transform .8s ease .1s, opacity .8s ease .1s",
      }}>
        Career highlights
      </h2>

      {/* Timeline */}
      <div style={{ position: "relative", maxWidth: "820px" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute",
          left: "23px",
          top: 0,
          bottom: 0,
          width: "2px",
          background: "var(--border)",
          borderRadius: "1px",
        }}>
          {/* Animated fill line */}
          <div style={{
            width: "100%",
            background: "var(--primary)",
            borderRadius: "1px",
            transition: "height 1.5s ease",
            height: headerVisible ? "100%" : "0%",
          }} />
        </div>

        {/* Cards */}
        {experiences.map((exp, i) => (
          <ScrollRevealCard key={exp.company} exp={exp} index={i} />
        ))}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════
// SCROLL REVEAL CARD COMPONENT
// ═══════════════════════════════════════════════════
function ScrollRevealCard({ exp, index }: {
  exp: typeof experiences[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hov, setHov] = useState(false);
  const [progress, setProgress] = useState(0);

  // Intersection Observer for visibility
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay based on index for stagger effect
          setTimeout(() => {
            setIsVisible(true);
          }, index * 150);
          obs.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  // Scroll progress for parallax
  const handleScroll = useCallback(() => {
    const el = cardRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate how far through the viewport the card has traveled
    const start = windowHeight;
    const end = -rect.height;
    const current = rect.top;
    const p = Math.max(0, Math.min(1, (start - current) / (start - end)));

    setProgress(p);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Dynamic transform based on scroll
  const parallaxY = isVisible ? 0 : 60;
  const parallaxScale = isVisible ? 1 : 0.95;
  const parallaxRotate = isVisible ? 0 : 2;

  return (
    <div
      ref={cardRef}
      style={{
        display: "flex",
        gap: "32px",
        marginBottom: index < experiences.length - 1 ? "48px" : "0",
        // Core animation
        opacity: isVisible ? 1 : 0,
        transform: `
          translateY(${parallaxY}px)
          scale(${parallaxScale})
          rotate(${parallaxRotate}deg)
        `,
        transition: `
          opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
          transform 1s cubic-bezier(0.16, 1, 0.3, 1)
        `,
        willChange: "transform, opacity",
      }}
    >
      {/* Timeline dot */}
      <div style={{
        flexShrink: 0,
        width: "48px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "28px",
      }}>
        {/* Dot with pulse animation */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: isVisible
              ? (hov ? "var(--primary)" : "var(--bg-card)")
              : "var(--bg-card)",
            border: `2.5px solid ${isVisible
                ? (hov ? "var(--primary)" : "var(--secondary)")
                : "var(--border)"
              }`,
            transition: "all .4s cubic-bezier(.16,1,.3,1)",
            boxShadow: hov
              ? "0 0 0 6px rgba(44,62,85,0.12)"
              : isVisible
                ? "0 0 0 4px rgba(44,62,85,0.06)"
                : "none",
            zIndex: 2,
            position: "relative",
          }} />

          {/* Pulse ring on reveal */}
          {isVisible && (
            <div style={{
              position: "absolute",
              inset: "-6px",
              borderRadius: "50%",
              border: "2px solid var(--primary)",
              animation: "pulseRing 1.5s ease forwards",
              opacity: 0,
            }} />
          )}
        </div>

        {/* Index number below dot */}
        <span style={{
          fontSize: "11px",
          fontWeight: 700,
          color: isVisible ? "var(--primary)" : "var(--border)",
          marginTop: "12px",
          letterSpacing: ".05em",
          transition: "color .6s ease",
          fontFamily: "'Inter',sans-serif",
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Card */}
      <div
        className="card"
        style={{
          flex: 1,
          padding: "clamp(28px,3.5vw,40px)",
          borderColor: hov ? "var(--primary)" : "var(--border)",
          boxShadow: hov ? "var(--shadow-lg)" : "var(--shadow-sm)",
          transform: hov ? "translateY(-6px)" : "translateY(0)",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* Top accent bar that grows on reveal */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          background: "var(--primary)",
          borderRadius: "0 0 2px 0",
          width: isVisible ? "100%" : "0%",
          transition: "width 1.2s cubic-bezier(.16,1,.3,1) 0.3s",
        }} />

        {/* Left accent line on hover */}
        <div style={{
          position: "absolute",
          left: 0,
          top: "20%",
          bottom: "20%",
          width: "3px",
          background: "var(--primary)",
          borderRadius: "0 2px 2px 0",
          opacity: hov ? 1 : 0,
          transform: hov ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "top",
          transition: "all .4s cubic-bezier(.16,1,.3,1)",
        }} />

        {/* Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "16px",
        }}>
          <div>
            {/* Role badge */}
            <span style={{
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "var(--primary)",
              background: "var(--primary-05)",
              border: "1px solid var(--primary-10)",
              padding: "5px 14px",
              borderRadius: "6px",
              display: "inline-block",
              marginBottom: "12px",
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              opacity: isVisible ? 1 : 0,
              transition: "transform .6s ease .3s, opacity .6s ease .3s",
            }}>{exp.role}</span>

            {/* Company name */}
            <h3 style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: "clamp(22px,3vw,28px)",
              fontWeight: 600,
              color: hov ? "var(--primary)" : "var(--headline)",
              lineHeight: 1.2,
              transition: "color .3s ease",
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              opacity: isVisible ? 1 : 0,
              transitionProperty: "color, transform, opacity",
              transitionDuration: ".3s, .7s, .7s",
              transitionDelay: "0s, .35s, .35s",
              transitionTimingFunction: "ease, cubic-bezier(.16,1,.3,1), ease",
            }}>{exp.company}</h3>
          </div>

          {/* Period */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transform: isVisible ? "translateX(0)" : "translateX(16px)",
            opacity: isVisible ? 1 : 0,
            transition: "transform .6s ease .4s, opacity .6s ease .4s",
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: exp.period.includes("Present")
                ? "#22c55e"
                : "var(--border)",
              boxShadow: exp.period.includes("Present")
                ? "0 0 8px rgba(34,197,94,0.4)"
                : "none",
              animation: exp.period.includes("Present")
                ? "pulse 2s ease infinite"
                : "none",
            }} />
            <span style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--muted)",
            }}>{exp.period}</span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "16px",
          lineHeight: 1.75,
          color: "var(--body)",
          marginBottom: "24px",
          maxWidth: "640px",
          transform: isVisible ? "translateY(0)" : "translateY(16px)",
          opacity: isVisible ? 1 : 0,
          transition: "transform .7s ease .45s, opacity .7s ease .45s",
        }}>{exp.desc}</p>

        {/* Divider */}
        <div style={{
          height: "1px",
          background: "var(--border)",
          marginBottom: "20px",
          transform: isVisible ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform .8s ease .5s",
        }} />

        {/* Achievements */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}>
          {exp.achievements.map((ach, j) => (
            <AchievementItem
              key={j}
              text={ach}
              index={j}
              isVisible={isVisible}
              isHovered={hov}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════
// ACHIEVEMENT ITEM WITH INDIVIDUAL ANIMATION
// ═══════════════════════════════════════════════════
function AchievementItem({ text, index, isVisible, isHovered }: {
  text: string;
  index: number;
  isVisible: boolean;
  isHovered: boolean;
}) {
  const [itemHov, setItemHov] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "8px 12px",
        borderRadius: "8px",
        background: itemHov ? "var(--primary-05)" : "transparent",
        transition: "all .3s ease",
        // Staggered animation
        transform: isVisible
          ? "translateX(0)"
          : "translateX(-24px)",
        opacity: isVisible ? 1 : 0,
        transitionProperty: "transform, opacity, background",
        transitionDuration: "0.6s, 0.6s, 0.3s",
        transitionDelay: `${0.55 + index * 0.08}s, ${0.55 + index * 0.08}s, 0s`,
        transitionTimingFunction: "cubic-bezier(.16,1,.3,1), ease, ease",
      }}
      onMouseEnter={() => setItemHov(true)}
      onMouseLeave={() => setItemHov(false)}
    >
      {/* Animated check dot */}
      <div style={{
        width: "20px",
        height: "20px",
        borderRadius: "6px",
        background: itemHov ? "var(--primary)" : "var(--primary-05)",
        border: `1.5px solid ${itemHov ? "var(--primary)" : "var(--primary-10)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: "1px",
        transition: "all .3s ease",
        // Scale in animation
        transform: isVisible ? "scale(1)" : "scale(0)",
        transitionProperty: "transform, background, border-color",
        transitionDuration: "0.5s, 0.3s, 0.3s",
        transitionDelay: `${0.6 + index * 0.08}s, 0s, 0s`,
      }}>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity .3s ease ${0.7 + index * 0.08}s`,
          }}
        >
          <path
            d="M2 5L4.5 7.5L8 3"
            stroke={itemHov ? "#FFFFFF" : "var(--primary)"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <span style={{
        fontSize: "15px",
        color: itemHov ? "var(--headline)" : "var(--body)",
        lineHeight: 1.6,
        transition: "color .3s ease",
        fontWeight: itemHov ? 500 : 400,
      }}>{text}</span>
    </div>
  );
}