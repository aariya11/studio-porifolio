import React, { useEffect } from 'react';
import { X, ArrowLeft, Calendar, Clock, Bookmark, Share2 } from 'lucide-react';
import { playFocusClick } from '../../utils/sound';

export default function ArticleReaderModal({ article, onClose }) {
  if (!article) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Split article content into paragraphs
  const paragraphs = article.content.split('\n\n');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-[8600] bg-[#070708] text-editorial-text overflow-y-auto"
    >
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-[#070708]/90 backdrop-blur-xl border-b border-editorial-border px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => {
            playFocusClick();
            onClose();
          }}
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO JOURNAL</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent-lime uppercase tracking-widest hidden sm:inline">
            {article.category}
          </span>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="p-2 rounded-full border border-editorial-border hover:border-white text-white hover:text-accent-lime transition-colors"
            aria-label="Close article"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Reading Column */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Article Meta */}
        <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6">
          <span className="text-accent-lime font-bold">{article.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" /> {article.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white leading-tight uppercase tracking-tight mb-8">
          {article.title}
        </h1>

        {/* Excerpt Lead */}
        <p className="font-serif italic text-xl sm:text-2xl text-neutral-200 border-l-2 border-accent-lime pl-6 my-8 leading-snug">
          {article.excerpt}
        </p>

        {/* Cover Photo */}
        <div className="my-12 rounded overflow-hidden border border-editorial-border bg-editorial-card shadow-2xl">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full max-h-[65vh] object-cover"
          />
          <div className="p-3 bg-black/40 font-mono text-[11px] text-neutral-400 text-center">
            Photo essay illustration — Alex Kane Studio Field Notes
          </div>
        </div>

        {/* Essay Paragraphs */}
        <div className="space-y-6 font-sans text-base sm:text-lg text-neutral-300 leading-relaxed max-w-3xl mx-auto">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        {/* Author Footer */}
        <div className="mt-16 pt-8 border-t border-editorial-border flex items-center justify-between font-mono text-xs text-neutral-400">
          <div>
            WRITTEN BY <span className="text-white font-bold">ALEX KANE</span> • PARIS
          </div>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="text-accent-lime hover:underline uppercase"
          >
            ← RETURN TO ARCHIVE
          </button>
        </div>
      </main>
    </div>
  );
}
