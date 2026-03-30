import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import { track } from "@/lib/analytics";

const BASE = "https://extranet.seepia.com/showcase";

type Project = {
  id: string;
  name: string;
  category: string;
  html: string;
  why: string;
  vertical: "gaming" | "non-gaming";
};

const projects: Project[] = [
  {
    id: "game24",
    name: "Homeland Survival",
    category: "Playable Ad",
    html: "HomelandSurvival0723-20230726-Applovin-yezo-Seepia-Playable.html",
    why: "The core survival loop is playable in seconds. Resource-gathering delivers instant dopamine hits — users feel progress before they even know they're in an ad.",
    vertical: "gaming",
  },
  {
    id: "game27",
    name: "Angry Birds 2: Floating Target",
    category: "Playable Ad",
    html: "AB2_FloatingTarget_Feb25_Unity_Long.html",
    why: "Decades of brand recognition meet satisfying physics. The slingshot pull is one of the most recognizable gestures in mobile gaming — engagement is instant, no tutorial needed.",
    vertical: "gaming",
  },
  {
    id: "game1",
    name: "Dream Blast",
    category: "Playable Ad",
    html: "DREAMBLAST_MakeEmExplode_Jun20_MoreBirds_ShortGame_FasterExplosions_OneChain.html",
    why: "Match mechanics are universally understood. The cascading explosion sequence provides a visceral reward that communicates the game's feel better than any video trailer ever could.",
    vertical: "gaming",
  },
  {
    id: "game22",
    name: "JJ: Detective Story",
    category: "Playable Ad",
    html: "jj_p_detective-story-easy-unity_-_-_loca_responsive_cta.html",
    why: "A story-driven hook opens a curiosity gap the user wants to close. Low skill barrier means near-100% completion rate — everyone solves the mystery, everyone sees the CTA.",
    vertical: "gaming",
  },
  {
    id: "game20",
    name: "Merge Dragons: Zodiac",
    category: "Playable Ad",
    html: "MergeDragonsZodiac-20230621-autoplayOff-unity-2MB-Seepia-Playable.html",
    why: "Merge has the lowest cognitive load of any mobile mechanic. Every tap creates visible progress, and the Zodiac theme adds a layer of identity that resonates across demographics.",
    vertical: "gaming",
  },
  {
    id: "game30",
    name: "Egg Competition",
    category: "Playable Ad",
    html: "EggCompetition0725-default-20250813-unity-constant-15s-3MB-Seepia-Playable.html",
    why: "Competitive framing creates urgency without pressure. The one-touch mechanic removes all friction — users are competing before they've consciously decided to engage.",
    vertical: "gaming",
  },
  {
    id: "game28",
    name: "Angry Birds 2: Fistful of Bacons",
    category: "Playable Ad",
    html: "AB2_FistfullOfBacons_Feb25_Unity_Long_NoTimer.html",
    why: "Humor + brand trust + satisfying physics is an irresistible combination. The absurd premise lowers guard, the familiar slingshot mechanic delivers, and the joke lands at CTA.",
    vertical: "gaming",
  },
  {
    id: "game19",
    name: "Mega Merge: Dragons",
    category: "Playable Ad",
    html: "MegaMerge0423-20230616-dragons2-autoplayOff-spawnEggsOff-unity-2MB-Seepia-Playable.html",
    why: "Visual richness signals production quality immediately. The merge satisfaction loop is so immediate that users self-select — if they like this, they already know they'll like the game.",
    vertical: "gaming",
  },
  /* ── Non-Gaming placeholders — replace with real entries ── */
  {
    id: "game24",
    name: "Homeland Survival",
    category: "Playable Ad",
    html: "HomelandSurvival0723-20230726-Applovin-yezo-Seepia-Playable.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game27",
    name: "Angry Birds 2: Floating Target",
    category: "Playable Ad",
    html: "AB2_FloatingTarget_Feb25_Unity_Long.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game1",
    name: "Dream Blast",
    category: "Playable Ad",
    html: "DREAMBLAST_MakeEmExplode_Jun20_MoreBirds_ShortGame_FasterExplosions_OneChain.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game22",
    name: "JJ: Detective Story",
    category: "Playable Ad",
    html: "jj_p_detective-story-easy-unity_-_-_loca_responsive_cta.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game20",
    name: "Merge Dragons: Zodiac",
    category: "Playable Ad",
    html: "MergeDragonsZodiac-20230621-autoplayOff-unity-2MB-Seepia-Playable.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game30",
    name: "Egg Competition",
    category: "Playable Ad",
    html: "EggCompetition0725-default-20250813-unity-constant-15s-3MB-Seepia-Playable.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game28",
    name: "Angry Birds 2: Fistful of Bacons",
    category: "Playable Ad",
    html: "AB2_FistfullOfBacons_Feb25_Unity_Long_NoTimer.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
  {
    id: "game19",
    name: "Mega Merge: Dragons",
    category: "Playable Ad",
    html: "MegaMerge0423-20230616-dragons2-autoplayOff-spawnEggsOff-unity-2MB-Seepia-Playable.html",
    why: "Placeholder — replace with a real non-gaming playable.",
    vertical: "non-gaming",
  },
];

const tabs: { id: "gaming" | "non-gaming"; label: string }[] = [
  { id: "gaming", label: "Gaming" },
  { id: "non-gaming", label: "Non-Gaming" },
];

export function Portfolio() {
  const [activeTab, setActiveTab] = useState<"gaming" | "non-gaming">("gaming");
  const [fullscreen, setFullscreen] = useState<Project | null>(null);

  const visible = projects.filter((p) => p.vertical === activeTab);

  const openGame = (project: Project) => {
    setFullscreen(project);
    track("playable_fullscreen", { game: project.name, source: "card_tap" });
  };

  return (
    <section id="work" className="py-32 relative z-10 bg-card border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + pill switcher */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="text-xl font-semibold mb-8" style={{ color: "#F89E00" }}>
            Yes, these are really under 5MB.
          </p>

          {/* Pill switcher */}
          <div className="inline-flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-2 rounded-full text-sm font-bold transition-colors duration-200 focus:outline-none"
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="portfolio-pill"
                    className="absolute inset-0 rounded-full bg-primary"
                    style={{ boxShadow: "0 0 18px rgba(248,158,0,0.4)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab.id ? "text-black" : "text-muted-foreground hover:text-white"}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {visible.map((project, index) => (
              <motion.div
                key={`${project.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="group flex flex-col rounded-2xl overflow-hidden bg-background cursor-pointer"
                onClick={() => openGame(project)}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden bg-black" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={`${BASE}/${project.id}/icon.jpg`}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 inset-x-0 flex justify-center pointer-events-none">
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-black bg-primary px-4 py-2 rounded-full shadow-[0_0_16px_rgba(248,158,0,0.5)] group-hover:shadow-[0_0_24px_rgba(248,158,0,0.8)] group-hover:scale-105 transition-all duration-200">
                      Tap to Play
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-bold text-white text-sm leading-snug">{project.name}</p>
                  <p className="text-primary text-xs font-semibold mt-0.5">Seepia Interactive</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Showreel CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 py-8"
        >
          <div>
            <p className="text-white font-bold text-xl mb-1">800+ playables in our catalog.</p>
            <p className="text-muted-foreground text-sm">These are just 8. Watch the full showreel to see the range — gaming, eCommerce, 2D, 3D, HTML5.</p>
          </div>
          <a
            href="https://extranet.seepia.com/showcase/videos/reel.mp4"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("showreel_click", { source: "portfolio_cta" })}
            className="group shrink-0 flex items-center gap-3 px-8 py-4 rounded-full font-bold text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_30px_rgba(248,158,0,0.3)] hover:shadow-[0_0_40px_rgba(248,158,0,0.5)] hover:-translate-y-1 whitespace-nowrap"
          >
            <Play className="w-5 h-5 fill-black" />
            See the full showreel
          </a>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setFullscreen(null)}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-sm flex flex-col rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,240,255,0.2)]"
            style={{ height: "min(85vh, 620px)" }}
          >
            <div className="flex items-center justify-between px-5 py-3 bg-card shrink-0">
              <div className="flex items-center gap-3">
                <img
                  src={`${BASE}/${fullscreen.id}/icon.jpg`}
                  alt={fullscreen.name}
                  className="w-8 h-8 rounded-lg object-cover"
                />
                <div>
                  <p className="font-bold text-white text-sm">{fullscreen.name}</p>
                  <p className="text-primary text-xs font-semibold">{fullscreen.category}</p>
                </div>
              </div>
              <button
                onClick={() => setFullscreen(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="px-5 py-3 bg-card/80 shrink-0 border-t border-white/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Why it works</p>
              <p className="text-xs text-white/70 leading-relaxed">{fullscreen.why}</p>
            </div>

            <iframe
              key={`${fullscreen.id}-${fullscreen.vertical}`}
              src={`${BASE}/${fullscreen.id}/${fullscreen.html}`}
              title={fullscreen.name}
              className="w-full flex-1 border-0 bg-black"
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
