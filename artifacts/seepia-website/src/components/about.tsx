import { motion } from "framer-motion";
import { Gamepad2, Target, Layers } from "lucide-react";

const cards = [
  {
    num: "01",
    icon: Gamepad2,
    title: "Game-native quality",
    description: "We build playables with real game feel, made by actual game developers.",
    iconColor: "#F89E00",
    iconBg: "rgba(248,158,0,0.12)",
  },
  {
    num: "02",
    icon: Target,
    title: "Performance mindset",
    description: "We design around engagement, iteration, and years of experience testing for UA goals.",
    iconColor: "#B446FF",
    iconBg: "rgba(180,70,255,0.12)",
  },
  {
    num: "03",
    icon: Layers,
    title: "Reliable production",
    description: "Fast, tailored and structured delivery across networks, variants, and production needs.",
    iconColor: "#F89E00",
    iconBg: "rgba(248,158,0,0.12)",
  },
];

export function About() {
  return (
    <section id="about" className="py-28 relative z-10 bg-background overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-secondary/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Built by <span className="text-gradient">Gamers</span>.<br />
            Driven by <span className="text-gradient">Data</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel rounded-3xl p-8 flex flex-col hover-glow group relative overflow-hidden min-h-[280px]"
            >
              {/* Ghost number */}
              <span
                className="absolute -bottom-4 -right-2 text-[9rem] font-display font-bold leading-none select-none pointer-events-none transition-opacity duration-500"
                style={{ color: card.iconColor, opacity: 0.06 }}
              >
                {card.num}
              </span>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                style={{ background: `radial-gradient(ellipse at top left, ${card.iconBg}, transparent 70%)` }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8 relative z-10"
                style={{ background: card.iconBg }}
              >
                <card.icon className="w-7 h-7" style={{ color: card.iconColor }} />
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col flex-1 justify-end">
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">{card.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
