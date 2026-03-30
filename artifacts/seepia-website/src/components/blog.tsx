import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Blog() {
  const posts = [
    {
      title: "The Future of Playable Ads in 2025",
      date: "Nov 12, 2024",
      image: "blog-1.webp"
    },
    {
      title: "Maximizing ROAS with Interactive Content",
      date: "Oct 28, 2024",
      image: "blog-2.webp"
    },
    {
      title: "Case Study: Supercell's Conversion Strategy",
      date: "Sep 15, 2024",
      image: "blog-3.webp"
    }
  ];

  return (
    <section id="blog" className="py-32 relative z-10 bg-card border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Latest <span className="text-gradient">Insights</span></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts, strategies, and case studies from the forefront of interactive advertising.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="rounded-3xl overflow-hidden aspect-video mb-6">
                <img 
                  src={`${import.meta.env.BASE_URL}images/${post.image}`} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2">
                <p className="text-sm font-medium text-primary mb-3">{post.date}</p>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <span className="flex items-center gap-2 text-sm font-semibold text-muted-foreground group-hover:text-white transition-colors">
                  Read Article <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
