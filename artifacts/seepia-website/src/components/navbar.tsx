import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "wouter";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navbar logo fades in exactly as the flying hero logo "arrives" and disappears
  const { scrollY } = useScroll();
  const navLogoOpacity = useTransform(scrollY, [170, 230], [0, 1]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { name: "Services", id: "services" },
    { name: "Work", id: "work" },
    { name: "About", id: "about" },
    { name: "News", id: "blog" },
  ];


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/85 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo — invisible at top, fades in as flying logo arrives */}
          <motion.a
            href="#hero"
            onClick={(e) => scrollTo(e, "hero")}
            className="flex items-center"
            style={{ opacity: navLogoOpacity }}
          >
            <img
              src={`${import.meta.env.BASE_URL}images/seepia-logo-new.png`}
              alt="Seepia"
              className="h-7 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Nav — always visible */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/careers"
              className="text-sm font-medium text-muted-foreground hover:text-white transition-colors"
            >
              Careers
            </Link>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="px-6 py-2.5 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(248,158,0,0.4)] transition-all duration-300"
            >
              Get in Touch
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl md:hidden">
          <div className="flex flex-col px-4 py-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => scrollTo(e, link.id)}
                className="text-lg font-medium text-muted-foreground hover:text-white transition-colors p-2"
              >
                {link.name}
              </a>
            ))}
            <Link
              href="/careers"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-muted-foreground hover:text-white transition-colors p-2"
            >
              Careers
            </Link>
            <a
              href="#contact"
              onClick={(e) => scrollTo(e, "contact")}
              className="mt-4 px-6 py-3 text-center rounded-xl font-semibold text-primary-foreground bg-primary shadow-[0_0_20px_rgba(248,158,0,0.3)]"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
