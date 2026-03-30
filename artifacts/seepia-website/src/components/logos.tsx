import { motion } from "framer-motion";

const BASE = import.meta.env.BASE_URL;
const DIR = `${BASE}images/client-logos/`;

const ROW1 = [
  "supercell.png", "rovio.png", "small-giant.png", "moon-active.png",
  "gram-games.png", "crazylabs.png", "poki.png", "nitro.png",
  "fingersoft.png", "wooga.png", "1839.png",
];

const ROW2 = [
  "novakid.png", "madbox.png", "ten-square-games.png", "pixelfederation.png",
  "bigbluebubble.png", "exmox.png", "ondo.png", "playsome.png",
  "swift-games-a.png", "bcg-battle-creek.png", "swift-games-b.png",
];

const row1 = [...ROW1, ...ROW1];
const row2 = [...ROW2, ...ROW2];

const LOGO_STYLE: React.CSSProperties = {
  filter: "brightness(0) invert(1)",
  opacity: 0.5,
};

export function Logos() {
  return (
    <section style={{ background: "#000000" }} className="py-12 overflow-hidden relative border-t border-white/5">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-xs font-bold uppercase tracking-[0.2em] mb-9"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        Trusted by Industry Leaders
      </motion.p>

      <div
        className="overflow-hidden mb-5"
        style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
      >
        <div className="flex animate-marquee" style={{ width: "max-content" }}>
          {row1.map((file, i) => (
            <div key={i} className="flex items-center justify-center mx-6 flex-shrink-0" style={{ width: 130, height: 52 }}>
              <img src={`${DIR}${file}`} alt="" className="max-w-full max-h-full object-contain" style={LOGO_STYLE} />
            </div>
          ))}
        </div>
      </div>

      <div
        className="overflow-hidden"
        style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}
      >
        <div className="flex animate-marquee-reverse" style={{ width: "max-content" }}>
          {row2.map((file, i) => (
            <div key={i} className="flex items-center justify-center mx-6 flex-shrink-0" style={{ width: 130, height: 52 }}>
              <img src={`${DIR}${file}`} alt="" className="max-w-full max-h-full object-contain" style={LOGO_STYLE} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
