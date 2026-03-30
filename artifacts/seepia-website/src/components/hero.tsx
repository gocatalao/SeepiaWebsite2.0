import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";

const BASE = "https://extranet.seepia.com/showcase";
const LOGO_SRC = `${import.meta.env.BASE_URL}images/seepia-logo-new.png`;

// Navbar logo target dimensions (must match navbar h-7 = 28px, py-4 = 16px top padding)
const NAV_LOGO_TOP = 18;
const NAV_LOGO_H = 28;

export function Hero() {
  const [gameLoaded, setGameLoaded] = useState(false);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const [logoPos, setLogoPos] = useState({ x: 32, y: 220, h: 80 });

  // Measure hero logo's rendered position so the flying clone starts exactly there
  useEffect(() => {
    const measure = () => {
      if (heroLogoRef.current) {
        const rect = heroLogoRef.current.getBoundingClientRect();
        setLogoPos({ x: rect.left, y: rect.top, h: rect.height });
      }
    };
    measure();
    // Re-measure on resize (responsive layouts shift positions)
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollY } = useScroll();

  // Flying logo animates Y from hero position → navbar position (X stays at content edge)
  const flyY = useTransform(scrollY, [0, 220], [logoPos.y, NAV_LOGO_TOP]);
  // Shrink height from big hero logo → small navbar logo
  const flyH = useTransform(scrollY, [0, 220], [logoPos.h, NAV_LOGO_H]);
  // Fade out as it "locks into" the navbar (navbar logo takes over)
  const flyOpacity = useTransform(scrollY, [170, 230], [1, 0]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Flying logo — desktop only (lg+). Fixed position, scroll-driven animation from hero → navbar */}
      {/* Wrapped in hidden lg:block so mobile never sees the fixed clone */}
      <div className="hidden lg:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          style={{
            position: "fixed",
            left: logoPos.x,
            top: flyY,
            height: flyH,
            zIndex: 60,
            pointerEvents: "none",
          }}
        >
          <motion.img
            src={LOGO_SRC}
            alt="Seepia"
            aria-hidden="true"
            style={{ height: "100%", width: "auto", opacity: flyOpacity }}
          />
        </motion.div>
      </div>

      <section id="hero" className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden">
        {/* Background blobs image */}
        <div className="absolute inset-0 z-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg-blobs.png`}
            alt=""
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
          {/* Left edge black gradient — thin strip matching the logo's left margin */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left: Text */}
            <div>
              {/* Mobile-only static logo — hidden on lg+ where the flying clone takes over */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="lg:hidden mb-5"
              >
                <img src={LOGO_SRC} alt="Seepia" className="h-16 w-auto" />
              </motion.div>

              {/* Desktop-only invisible placeholder — measures position for the flying clone */}
              <motion.div
                ref={heroLogoRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0 }}
                className="mb-4 inline-block hidden lg:inline-block"
              >
                <img
                  src={LOGO_SRC}
                  alt="Seepia"
                  className="h-20 w-auto"
                />
              </motion.div>

              {/* Copy shifted ~20px right so logo reads more to the left visually */}
              <div className="pl-5">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[1.1] mb-6"
              >
                Crafting play
                <br />
                <span className="text-gradient">that performs.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
              >
                We create high-quality playable ads and interactive experiences for gaming and performance driven apps.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => {
                    track("hero_cta_click", { button: "see_our_work" });
                    scrollTo("work");
                  }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white bg-white/10 hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  See Our Work
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    track("hero_cta_click", { button: "get_in_touch" });
                    scrollTo("contact");
                  }}
                  className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(248,158,0,0.35)] hover:shadow-[0_0_40px_rgba(248,158,0,0.55)] hover:-translate-y-1"
                >
                  Get in Touch
                </button>
              </motion.div>
              </div>{/* end copy indent */}
            </div>

            {/* Right: Live Playable Ad — always loaded, audio blocked by browser policy */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:flex items-center justify-center"
            >
              {/* Phone frame */}
              <div className="relative w-[300px] h-[580px]">
                {/* Phone shell */}
                <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-white/10 to-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />

                {/* Screen area */}
                <div className="absolute inset-[6px] rounded-[36px] overflow-hidden bg-black">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20" />

                  {/* Fallback: game icon shown instantly, fades out once iframe loads */}
                  <img
                    src={`${BASE}/game27/icon.jpg`}
                    alt="Angry Birds 2"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 z-10 pointer-events-none ${
                      gameLoaded ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Subtle loading ring — behind the icon */}
                  {!gameLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                      <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
                    </div>
                  )}

                  {/* Live playable iframe — served via mute proxy (same-origin, AudioContext overridden) */}
                  <iframe
                    src="/game-proxy/game27/AB2_FloatingTarget_Feb25_Unity_Long.html"
                    title="Angry Birds 2: Floating Target — Live Playable"
                    className="absolute inset-0 w-full h-full border-0 z-5"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                    onLoad={() => setGameLoaded(true)}
                  />
                </div>

                {/* Side buttons */}
                <div className="absolute right-[-3px] top-28 w-[3px] h-10 bg-white/15 rounded-l-sm" />
                <div className="absolute left-[-3px] top-20 w-[3px] h-8 bg-white/15 rounded-r-sm" />
                <div className="absolute left-[-3px] top-32 w-[3px] h-8 bg-white/15 rounded-r-sm" />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
