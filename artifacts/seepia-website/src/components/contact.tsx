import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, Loader2, CalendarDays, Linkedin } from "lucide-react";
import { track } from "@/lib/analytics";

const CALENDLY_URL = "https://calendly.com/seepia";
const TELEGRAM_URL = "https://t.me/seepia";
const LINKEDIN_URL = "https://linkedin.com/company/seepia";

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const channels = [
  {
    label: "Book a 20-min call",
    href: CALENDLY_URL,
    icon: <CalendarDays className="w-4 h-4" />,
    event: "book_call_click",
    external: true,
    highlight: true,
  },
  {
    label: "hello@seepia.com",
    href: "mailto:hello@seepia.com",
    icon: <Mail className="w-4 h-4" />,
    event: "email_click",
  },
  {
    label: "Telegram Messenger",
    href: TELEGRAM_URL,
    icon: <TelegramIcon className="w-4 h-4" />,
    event: "telegram_click",
    external: true,
  },
  {
    label: "LinkedIn Message",
    href: LINKEDIN_URL,
    icon: <Linkedin className="w-4 h-4" />,
    event: "linkedin_click",
    external: true,
  },
];

export function Contact() {
  const { toast } = useToast();
  const submitContact = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await submitContact.mutateAsync({ data });
      track("contact_form_submit", { company: data.company ?? "unknown" });
      toast({
        title: "Message Sent!",
        description: "We've received your message and will be in touch shortly.",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-32 relative z-10 bg-background border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading + compact contact pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:pt-4"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold mb-10">
              Let's Build Something <span className="text-gradient">Epic.</span>
            </h2>

            <div className="flex flex-col gap-3 mt-2">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  onClick={() => track(ch.event, { source: "contact_section" })}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 group ${
                    ch.highlight
                      ? "bg-primary text-black hover:bg-primary/90 shadow-[0_0_24px_rgba(248,158,0,0.25)]"
                      : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                  }`}
                >
                  <span className={`shrink-0 ${ch.highlight ? "text-black" : "text-primary"}`}>
                    {ch.icon}
                  </span>
                  <span className="flex-1 font-semibold">{ch.label}</span>
                  <span className="text-xs opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200">→</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel p-8 sm:p-10 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Name</label>
                  <input
                    {...register("name")}
                    className="w-full bg-input border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Email</label>
                  <input
                    {...register("email")}
                    className="w-full bg-input border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    placeholder="john@company.com"
                  />
                  {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Company</label>
                <input
                  {...register("company")}
                  className="w-full bg-input border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  placeholder="Awesome Games Inc."
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Message</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className="w-full bg-input border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
                {errors.message && <p className="text-red-400 text-xs">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-primary hover:bg-primary/90 transition-all duration-300 shadow-[0_0_20px_rgba(248,158,0,0.2)] hover:shadow-[0_0_30px_rgba(248,158,0,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
