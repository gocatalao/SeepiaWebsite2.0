import { motion } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MapPin, ArrowUpRight } from "lucide-react";

const roles = [
  {
    title: "Senior HTML5 Game Developer",
    team: "Engineering",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
  {
    title: "Unity Developer",
    team: "Engineering",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
  {
    title: "Creative Technologist",
    team: "Creative",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
  {
    title: "3D Artist",
    team: "Creative",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
  {
    title: "UX / Interaction Designer",
    team: "Design",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
  {
    title: "Account Manager — Gaming",
    team: "Sales",
    location: "Remote / Tallinn",
    type: "Full-time",
  },
];

const perks = [
  {
    num: "01",
    title: "Work on iconic brands",
    desc: "Your work reaches millions of players through campaigns for the world's top gaming studios and app developers.",
  },
  {
    num: "02",
    title: "Remote-first culture",
    desc: "Work from wherever you do your best work. We keep the team tight and the meetings few.",
  },
  {
    num: "03",
    title: "Ship fast, see results",
    desc: "Playables go live in weeks, not quarters. You'll see your work in the wild and know exactly how it performed.",
  },
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 relative overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-20 blur-[120px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #F89E00 0%, transparent 70%)" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-black bg-primary px-4 py-2 rounded-full mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              We're hiring
            </span>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6">
              Build the future of{" "}
              <span className="text-gradient">interactive</span>{" "}
              advertising.
            </h1>

            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              We're a team of developers, designers and storytellers crafting playable experiences that people actually enjoy. Since 2012, our work has run inside campaigns for some of the biggest games and apps in the world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Seepia */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-display font-bold mb-12"
          >
            Why <span className="text-gradient">Seepia</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {perks.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="glass-panel rounded-2xl p-8 relative overflow-hidden"
              >
                <span
                  className="absolute top-4 right-6 font-display font-bold text-7xl leading-none select-none"
                  style={{ color: "rgba(248,158,0,0.07)" }}
                >
                  {p.num}
                </span>
                <h3 className="text-xl font-bold text-white mb-3 relative z-10">{p.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed relative z-10">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
              Open <span className="text-gradient">positions</span>
            </h2>
            <p className="text-white/50 text-sm">All roles are remote-friendly unless stated otherwise.</p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {roles.map((role, i) => (
              <motion.a
                key={role.title}
                href="mailto:hello@seepia.com?subject=Application — ${role.title}"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="group flex items-center justify-between gap-4 glass-panel rounded-2xl px-6 py-5 hover:border-primary/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-5 min-w-0">
                  <span
                    className="hidden sm:inline-block text-xs font-bold uppercase tracking-[0.12em] px-3 py-1 rounded-full shrink-0"
                    style={{ color: "#F89E00", background: "rgba(248,158,0,0.1)", border: "1px solid rgba(248,158,0,0.2)" }}
                  >
                    {role.team}
                  </span>
                  <span className="font-bold text-white text-base truncate">{role.title}</span>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="hidden md:flex items-center gap-1.5 text-xs text-white/40">
                    <MapPin className="w-3.5 h-3.5" />
                    {role.location}
                  </span>
                  <span className="text-xs text-white/30">{role.type}</span>
                  <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                </div>
              </motion.a>
            ))}
          </div>

          {/* No role? Open application */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 rounded-2xl border border-white/10 bg-white/[0.02] px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div>
              <p className="font-bold text-white text-lg mb-1">Don't see your role?</p>
              <p className="text-white/50 text-sm max-w-md">We always want to hear from exceptional people. Send us a note about what you do and why Seepia interests you.</p>
            </div>
            <a
              href="mailto:hello@seepia.com?subject=Open Application"
              className="shrink-0 px-6 py-3 rounded-full font-bold text-sm bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(248,158,0,0.4)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Send open application
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
