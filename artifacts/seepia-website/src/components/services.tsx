import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Smartphone, Users, ShoppingBag } from "lucide-react";

type Bullet = { title: string; desc?: string };

const services = [
  {
    id: "playable",
    tab: "Playable Ads",
    icon: Gamepad2,
    color: "#F89E00",
    glow: "rgba(248,158,0,0.12)",
    title: "Playable Ads",
    description:
      "Miniature versions of your game that let users play before they install. We build the full loop — mechanic, feel, end card — optimized for every major ad network.",
    bullets: [
      { title: "HTML5 Engineering", desc: "Custom highly-optimized playables under 5MB." },
      { title: "All Networks & All Localizations", desc: "We support all networks with embedded localizations built into each playable." },
      { title: "Fast Iteration", desc: "Rapid variant delivery so you can A/B test and optimize while the campaign is live." },
    ] as Bullet[],
  },
  {
    id: "apps",
    tab: "Apps",
    icon: Smartphone,
    color: "#B446FF",
    glow: "rgba(180,70,255,0.12)",
    title: "Apps — Fin, Ed & Social",
    description:
      "From fintech onboarding to EdTech and social platforms — we turn complex value props into interactive demos users can feel before they sign up. Playable ads that explain by doing.",
    bullets: [
      { title: "Interactive product demos" },
      { title: "Onboarding flow simulations" },
      { title: "High-conversion end cards" },
      { title: "Zero friction, no app install needed" },
    ] as Bullet[],
  },
  {
    id: "brands",
    tab: "Consumer Brands",
    icon: Users,
    color: "#B446FF",
    glow: "rgba(180,70,255,0.12)",
    title: "Consumer Brands",
    description:
      "Playable experiences for lifestyle, beauty, and retail. We transform passive scrolling into active brand discovery — letting users feel the brand story before they buy.",
    bullets: [
      { title: "Gamified brand interactions" },
      { title: "Story-driven playable formats" },
      { title: "Lifestyle & beauty verticals" },
      { title: "Drives awareness and purchase intent" },
    ] as Bullet[],
  },
  {
    id: "ecommerce",
    tab: "eCommerce",
    icon: ShoppingBag,
    color: "#F89E00",
    glow: "rgba(248,158,0,0.12)",
    title: "eCommerce Ads",
    description:
      "Interactive 3D product configurators and gamified shopping experiences that turn browsers into buyers. Show the product, let them interact — before they ever visit the store.",
    bullets: [
      { title: "3D product configurators" },
      { title: "Gamified shopping flows" },
      { title: "Shoppable interactive formats" },
      { title: "Boosts ROAS and AOV" },
    ] as Bullet[],
  },
];

export function Services() {
  const [active, setActive] = useState(services[0].id);
  const current = services.find((s) => s.id === active)!;
  const Icon = current.icon;
  const hasFeaturedBullets = current.bullets.some((b) => b.desc);

  return (
    <section id="services" className="py-28 relative z-10 bg-background border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Our Core <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-xl">
            We build performant, lightweight HTML5 interactives that run perfectly inside any ad network or social platform.
          </p>
        </div>

        {/* Segmented tab bar */}
        <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 mb-14 flex-wrap gap-1">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className="relative px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none"
            >
              {active === s.id && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#F89E00", boxShadow: "0 0 18px rgba(248,158,0,0.4)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
              <span className={`relative z-10 ${active === s.id ? "text-black font-bold" : "text-muted-foreground hover:text-white"}`}>
                {s.tab}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left */}
            <div>
              <h3
                className="text-5xl md:text-6xl font-display font-bold mb-6"
                style={{ color: current.color }}
              >
                {current.title}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-md">
                {current.description}
              </p>

              {/* Bullets — featured (title + desc) or simple */}
              {hasFeaturedBullets ? (
                <div className="flex flex-col gap-4 mb-10">
                  {current.bullets.map((b) => (
                    <div
                      key={b.title}
                      className="glass-panel rounded-2xl px-5 py-4 border-l-2"
                      style={{ borderColor: current.color }}
                    >
                      <p className="text-white font-bold text-sm mb-0.5">{b.title}</p>
                      {b.desc && <p className="text-muted-foreground text-sm">{b.desc}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <ul className="space-y-3 mb-10">
                  {current.bullets.map((b) => (
                    <li key={b.title} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: current.color }} />
                      {b.title}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex flex-wrap gap-3">
                <a
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-black transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: current.color, boxShadow: `0 0 20px ${current.glow}` }}
                >
                  Request Demo
                </a>
                <a
                  href="#work"
                  onClick={(e) => { e.preventDefault(); document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-6 py-3 rounded-full text-sm font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
                >
                  See Examples
                </a>
              </div>
            </div>

            {/* Right — icon visual */}
            <div className="relative flex items-center justify-center h-72 lg:h-80">
              <div
                className="absolute inset-0 rounded-3xl"
                style={{ background: `radial-gradient(ellipse at center, ${current.glow} 0%, transparent 70%)` }}
              />
              <div
                className="absolute inset-0 opacity-[0.07] rounded-3xl"
                style={{
                  backgroundImage: `radial-gradient(circle, ${current.color} 1px, transparent 1px)`,
                  backgroundSize: "26px 26px",
                }}
              />
              <motion.div
                key={current.id + "-icon"}
                initial={{ scale: 0.75, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="relative z-10 flex flex-col items-center gap-5"
              >
                <div
                  className="w-36 h-36 rounded-3xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${current.color}25, ${current.color}06)`,
                    border: `1px solid ${current.color}30`,
                    boxShadow: `0 0 70px ${current.glow}, 0 0 20px ${current.glow}`,
                  }}
                >
                  <Icon className="w-16 h-16" style={{ color: current.color }} />
                </div>
                <span
                  className="text-xs font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full"
                  style={{ color: current.color, background: `${current.color}12`, border: `1px solid ${current.color}20` }}
                >
                  {current.tab}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}
