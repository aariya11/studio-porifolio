import React from 'react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import { JOURNAL_POSTS } from '../../data/portfolioData';
import { playFocusClick } from '../../utils/sound';

export default function Journal({ onSelectArticle }) {
  const handleArticleClick = (post) => {
    playFocusClick();
    onSelectArticle(post);
  };

  return (
    <section
      id="journal"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-editorial-black border-t border-editorial-border/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-editorial-border/60">
          <div>
            <div className="font-mono text-xs text-accent-lime uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span>06 / CRITICAL ESSAYS & FIELD NOTES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              THE JOURNAL
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-editorial-muted max-w-md leading-relaxed">
            Reflections on light, optics, analogue process, casting psychology, and the changing ethics of editorial portraiture.
          </p>
        </div>

        {/* Journal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
          {JOURNAL_POSTS.map((post) => (
            <article
              key={post.id}
              data-cursor="view"
              onClick={() => handleArticleClick(post)}
              className="group cursor-pointer rounded-lg border border-editorial-border bg-editorial-card p-6 sm:p-8 hover:border-editorial-borderHover transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Cover Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded mb-6 border border-white/5">
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded font-mono text-[10px] text-accent-lime uppercase tracking-wider border border-white/10">
                    {post.category}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 font-mono text-xs text-neutral-400 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white group-hover:text-accent-lime transition-colors leading-tight mb-3">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="font-sans text-sm text-neutral-300 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-editorial-border/60 flex items-center justify-between font-mono text-xs">
                <span className="text-white group-hover:text-accent-lime uppercase tracking-wider font-semibold">
                  READ FULL ESSAY
                </span>
                <div className="w-8 h-8 rounded-full border border-editorial-border group-hover:border-accent-lime flex items-center justify-center text-white group-hover:text-accent-lime transition-all duration-300 group-hover:translate-x-1">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
