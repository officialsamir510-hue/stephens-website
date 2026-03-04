import { useEffect, useRef, useState } from "react";
import { FloatingParticles, WireframeSphere } from "./Scene3D";

function SplitText({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span>
      {text.split("").map((c, i) => (
        <span key={i} className="char">
          <span className="char-inner" style={{ animationDelay: `${delay + i * 0.03}s` }}>
            {c === " " ? "\u00A0" : c}
          </span>
        </span>
      ))}
    </span>
  );
}

const roles = [
  "Transformational executive",
  "Banking & fintech leader",
  "M&A strategist",
  "Board advisor",
  "Turnaround specialist"
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);
  const [txt, setTxt] = useState(roles[0]);
  const [del, setDel] = useState(false);
  const [cnt, setCnt] = useState(roles[0].length);

  useEffect(() => {
    const cur = roles[role];
    let t: ReturnType<typeof setTimeout>;
    if (!del && cnt < cur.length) t = setTimeout(() => { setTxt(cur.slice(0, cnt + 1)); setCnt(c => c + 1); }, 72);
    else if (!del && cnt === cur.length) t = setTimeout(() => setDel(true), 2400);
    else if (del && cnt > 0) t = setTimeout(() => { setTxt(cur.slice(0, cnt - 1)); setCnt(c => c - 1); }, 36);
    else if (del && cnt === 0) { setDel(false); setRole(r => (r + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [cnt, del, role]);

  useEffect(() => {
    const onScroll = () => {
      heroRef.current?.querySelectorAll<HTMLElement>("[data-d]").forEach(el => {
        el.style.transform = `translateY(${window.scrollY * parseFloat(el.dataset.d || "0")}px)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const stats = [
    { num: "$23B+", label: "Assets managed" },
    { num: "35+", label: "Years experience" },
    { num: "70+", label: "Clients advised" },
  ];

  return (
    <section ref={heroRef} id="home" style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0 clamp(24px,6vw,96px)",
      paddingTop: "120px",
      paddingBottom: "80px",
      background: "var(--bg)",
    }}>
      {/* 3D Particles */}
      <FloatingParticles count={40} color="44,62,85" />

      {/* Sphere */}
      <div data-d="0.04" style={{
        position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)",
        zIndex: 1, pointerEvents: "none", opacity: 0.5,
      }}>
        <WireframeSphere size={380} />
        <div style={{
          position: "absolute", inset: "-30px",
          animation: "rotateSlow 30s linear infinite",
          borderRadius: "50%",
          border: "1px solid rgba(44,62,85,0.08)",
        }}>
          <div style={{
            position: "absolute", top: "-4px", left: "50%",
            width: "8px", height: "8px", borderRadius: "50%",
            background: "var(--primary)", transform: "translateX(-50%)",
            boxShadow: "0 0 16px rgba(44,62,85,0.4)",
          }} />
        </div>
      </div>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(44,62,85,0.07) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse at 30% 50%, black 15%, transparent 65%)",
        WebkitMaskImage: "radial-gradient(ellipse at 30% 50%, black 15%, transparent 65%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: "820px" }}>

        {/* Status */}
        <div style={{
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "clamp(40px,6vh,72px)",
        }}>
          <div className="fade-up" style={{
            animationDelay: ".5s",
            padding: "8px 20px",
            display: "flex", alignItems: "center", gap: "10px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "100px",
            boxShadow: "var(--shadow-sm)",
          }}>
            <div style={{ position: "relative", width: "8px", height: "8px" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#22c55e", animation: "pulse 2.5s ease infinite" }} />
              <div style={{ position: "absolute", inset: "-3px", borderRadius: "50%", border: "1px solid #22c55e", animation: "pulseRing 2.5s ease infinite" }} />
            </div>
            <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--muted)" }}>Open for board & advisory roles</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ marginBottom: "clamp(24px,4vh,40px)" }}>
          <h1 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(48px,8vw,64px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            color: "var(--headline)",
            marginBottom: "8px",
          }}>
            <SplitText text="Stephen K. Curry" delay={.6} />
          </h1>
        </div>

        {/* Typewriter */}
        <div className="fade-up" style={{
          animationDelay: "1.4s",
          display: "flex", alignItems: "center", gap: "12px",
          marginBottom: "clamp(24px,4vh,40px)",
        }}>
          <div style={{ width: "32px", height: "2px", background: "var(--primary)", borderRadius: "1px" }} />
          <span style={{ fontSize: "18px", fontWeight: 400, color: "var(--secondary)" }}>
            {txt}
            <span style={{ color: "var(--primary)", marginLeft: "2px", animation: "blink 1.1s step-end infinite" }}>|</span>
          </span>
        </div>

        {/* Description */}
        <p className="fade-up" style={{
          animationDelay: "1.6s",
          fontSize: "18px",
          lineHeight: 1.8,
          color: "var(--body)",
          maxWidth: "640px",
          marginBottom: "clamp(32px,5vh,56px)",
          fontWeight: 400,
        }}>
          Strategic, people-centered executive with a track record of driving innovation,
          complex transformations, and business growth across financial institutions and fintech ventures.
        </p>

        {/* Divider */}
        <div style={{
          height: "2px",
          background: "linear-gradient(90deg, var(--primary), var(--secondary), transparent)",
          marginBottom: "clamp(28px,4vh,48px)",
          transformOrigin: "left",
          transform: "scaleX(0)",
          animation: "lineGrow 1.2s cubic-bezier(.16,1,.3,1) 1.8s forwards",
          borderRadius: "1px",
        }} />

        {/* CTAs */}
        <div style={{
          display: "flex", gap: "16px", alignItems: "center",
          flexWrap: "wrap", marginBottom: "clamp(40px,6vh,72px)",
        }}>
          <a href="#experience" className="btn btn-primary fade-up" style={{ animationDelay: "2s" }}>
            View experience
          </a>
          <a href="#contact" className="btn btn-outline fade-up" style={{ animationDelay: "2.1s" }}>
            Get in touch
          </a>
        </div>

        {/* Stats */}
        <div className="fade-up" style={{
          animationDelay: "2.2s",
          display: "flex", gap: "clamp(24px,4vw,56px)", flexWrap: "wrap",
        }}>
          {stats.map(({ num, label }) => (
            <div key={label}>
              <div style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "clamp(32px,5vw,48px)",
                fontWeight: 700,
                color: "var(--primary)",
                lineHeight: 1,
                marginBottom: "4px",
              }}>{num}</div>
              <div style={{
                fontSize: "13px",
                color: "var(--muted)",
                fontWeight: 500,
              }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="fade-up" style={{
        animationDelay: "2.4s",
        position: "absolute", bottom: "40px", left: "50%",
        transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
      }}>
        <div style={{
          width: "28px", height: "44px", borderRadius: "14px",
          border: "2px solid var(--border)",
          display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "8px",
        }}>
          <div style={{
            width: "3px", height: "8px", borderRadius: "2px",
            background: "var(--primary)", animation: "scrollDot 1.6s ease infinite",
          }} />
        </div>
        <span style={{ fontSize: "11px", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--muted)" }}>Scroll</span>
      </div>

      <style>{`
        @media(max-width:900px){
          .hero-stats{flex-direction:column;gap:16px!important;}
        }
      `}</style>
    </section>
  );
}