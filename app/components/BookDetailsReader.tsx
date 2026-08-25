'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  List,
  Search,
  Settings,
  X,
  SlidersHorizontal,
  Code2,
  Play,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import type { Chapter, Story } from '@/lib/data';

type ReaderTheme = 'reader-white' | 'reader-sepia' | 'reader-dark';
type Panel = 'toc' | 'search' | 'settings' | null;

type Props = {
  story: Story & { authorName: string };
  chapters: Chapter[];
};

const themeOptions: { id: ReaderTheme; label: string; swatch: string }[] = [
  { id: 'reader-white', label: 'Light', swatch: 'bg-white' },
  { id: 'reader-sepia', label: 'Sepia', swatch: 'bg-[#f6efdf]' },
  { id: 'reader-dark', label: 'Dark', swatch: 'bg-[#171a21]' },
];

export default function BookDetailsReader({ story, chapters }: Props) {
  const [panel, setPanel] = useState<Panel>(null);
  const [theme, setTheme] = useState<ReaderTheme>('reader-white');
  const [fontSize, setFontSize] = useState(18);
  const [lineHeight, setLineHeight] = useState(1.8);
  const [alignment, setAlignment] = useState<'left' | 'justify'>('justify');
  const [query, setQuery] = useState('');

  const firstChapter = chapters[0];
  const filteredChapters = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return chapters;
    return chapters.filter((chapter) => `${chapter.title} ${chapter.content}`.toLowerCase().includes(normalized));
  }, [chapters, query]);

  const closePanel = () => setPanel(null);
  const cyclePanel = (next: Exclude<Panel, null>) => setPanel((current) => (current === next ? null : next));

  return (
    <div className={`book-reader ${theme}`} style={{ '--reader-size': `${fontSize}px`, '--reader-leading': lineHeight } as React.CSSProperties}>
      <header className="reader-header">
        <button type="button" className="reader-icon-button" onClick={() => cyclePanel('toc')} aria-label="Open table of contents">
          <List size={19} />
        </button>
        <div className="reader-header-title">{story.title}</div>
        <div className="reader-header-actions">
          <button type="button" className="reader-icon-button" onClick={() => cyclePanel('search')} aria-label="Search chapters">
            <Search size={18} />
          </button>
          <button type="button" className="reader-icon-button" onClick={() => cyclePanel('settings')} aria-label="Reader settings">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <main className="reader-main">
        <button type="button" className="reader-side-nav reader-side-nav-left" onClick={() => cyclePanel('toc')} aria-label="Open chapters">
          <ChevronLeft size={21} />
        </button>
        <section className="reader-content">
          <div className="book-hero">
            <div className="book-cover-wrap">
              <div className="cover-fallback" aria-hidden="true"><span>{story.title}</span><small>inkbwet</small></div>
              <Image src={story.coverImage} alt={story.title} width={560} height={760} className="book-cover" priority onError={(event) => { event.currentTarget.style.display = 'none'; }} />
            </div>
            <div className="book-hero-copy">
              <p className="reader-eyebrow">A book on Inkbwet</p>
              <h1>{story.title}</h1>
              <p className="book-author">By {story.authorName}</p>
              <p className="book-description">{story.description}</p>
              <div className="book-actions">
                {firstChapter ? (
                  <Link className="reader-primary-button" href={`/stories/${story.id}/chapters/${firstChapter.id}`}>
                    <Play size={16} fill="currentColor" /> Start reading
                  </Link>
                ) : null}
                <Link className="reader-secondary-button" href={`/stories/${story.id}/examples`}>
                  <Code2 size={16} /> Code &amp; examples
                </Link>
              </div>
              <div className="book-stats" aria-label="Book details">
                <span><strong>{chapters.length}</strong> chapters</span>
                <span><strong>Reader</strong> mode</span>
                <span><strong>Free</strong> to read</span>
              </div>
            </div>
          </div>

          <div className="reader-section-heading">
            <div>
              <p className="reader-eyebrow">Table of contents</p>
              <h2>Chapters</h2>
            </div>
            <span className="chapter-count">{chapters.length} available</span>
          </div>

          <div className="chapter-list">
            {chapters.length > 0 ? chapters.map((chapter, index) => (
              <Link href={`/stories/${story.id}/chapters/${chapter.id}`} key={chapter.id} className="chapter-row">
                <span className="chapter-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="chapter-copy">
                  <strong>{chapter.title}</strong>
                  <small>Chapter {chapter.chapterNumber} · Continue reading</small>
                </span>
                <ChevronRight className="chapter-arrow" size={18} />
              </Link>
            )) : (
              <div className="reader-empty">No chapters have been published for this book yet.</div>
            )}
          </div>

          <div className="examples-callout">
            <div className="examples-callout-icon"><Code2 size={21} /></div>
            <div>
              <p className="reader-eyebrow">Quick reference</p>
              <h3>Key code blocks &amp; examples</h3>
              <p>Browse the code examples collected from the Software Engineering reference ebook in one searchable index.</p>
            </div>
            <Link href={`/stories/${story.id}/examples`} className="callout-link">Browse <ChevronRight size={16} /></Link>
          </div>
        </section>
        <button type="button" className="reader-side-nav reader-side-nav-right" onClick={() => firstChapter && (window.location.href = `/stories/${story.id}/chapters/${firstChapter.id}`)} aria-label="Start reading">
          <ChevronRight size={21} />
        </button>
      </main>

      {panel ? <div className="reader-overlay" onClick={closePanel} aria-hidden="true" /> : null}
      <aside className={`reader-drawer ${panel ? 'is-open' : ''}`} aria-hidden={!panel}>
        <div className="drawer-header">
          <div>
            <p className="reader-eyebrow">{panel === 'toc' ? 'Book navigation' : panel === 'search' ? 'Find in book' : 'Reading preferences'}</p>
            <h2>{panel === 'toc' ? 'Contents' : panel === 'search' ? 'Search' : 'Settings'}</h2>
          </div>
          <button type="button" className="reader-icon-button" onClick={closePanel} aria-label="Close panel"><X size={18} /></button>
        </div>

        {panel === 'toc' ? (
          <nav className="drawer-nav">
            <Link href={`/stories/${story.id}`} onClick={closePanel} className="drawer-link drawer-link-active"><BookOpen size={16} /> Book details</Link>
            {chapters.map((chapter, index) => <Link href={`/stories/${story.id}/chapters/${chapter.id}`} key={chapter.id} onClick={closePanel} className="drawer-link"><span>{String(index + 1).padStart(2, '0')}</span>{chapter.title}</Link>)}
            <Link href={`/stories/${story.id}/examples`} onClick={closePanel} className="drawer-link"><Code2 size={16} /> Code &amp; examples</Link>
          </nav>
        ) : null}

        {panel === 'search' ? (
          <div className="drawer-body">
            <label className="reader-search-field"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search chapter titles or text" autoFocus /></label>
            <p className="search-result-count">{filteredChapters.length} matching chapter{filteredChapters.length === 1 ? '' : 's'}</p>
            <div className="drawer-nav">{filteredChapters.map((chapter) => <Link href={`/stories/${story.id}/chapters/${chapter.id}`} key={chapter.id} onClick={closePanel} className="drawer-link"><span>{String(chapter.chapterNumber).padStart(2, '0')}</span>{chapter.title}</Link>)}</div>
          </div>
        ) : null}

        {panel === 'settings' ? (
          <div className="drawer-body settings-body">
            <div className="setting-group"><div className="setting-label"><span>Theme</span><span className="setting-value">{themeOptions.find((option) => option.id === theme)?.label}</span></div><div className="theme-options">{themeOptions.map((option) => <button type="button" key={option.id} onClick={() => setTheme(option.id)} className={`theme-option ${theme === option.id ? 'selected' : ''}`}><span className={`theme-swatch ${option.swatch}`} />{option.label}</button>)}</div></div>
            <div className="setting-group"><div className="setting-label"><span>Font size</span><span className="setting-value">{fontSize}px</span></div><div className="range-row"><button type="button" onClick={() => setFontSize((size) => Math.max(14, size - 1))}>A−</button><input aria-label="Font size" type="range" min="14" max="24" value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} /><button type="button" onClick={() => setFontSize((size) => Math.min(24, size + 1))}>A+</button></div></div>
            <div className="setting-group"><div className="setting-label"><span>Line height</span><span className="setting-value">{lineHeight.toFixed(1)}</span></div><input aria-label="Line height" className="full-range" type="range" min="1.4" max="2.2" step="0.1" value={lineHeight} onChange={(event) => setLineHeight(Number(event.target.value))} /></div>
            <div className="setting-group"><div className="setting-label"><span>Text alignment</span><SlidersHorizontal size={15} /></div><div className="alignment-options"><button type="button" className={alignment === 'left' ? 'selected' : ''} onClick={() => setAlignment('left')}>Left</button><button type="button" className={alignment === 'justify' ? 'selected' : ''} onClick={() => setAlignment('justify')}>Justify</button></div></div>
            <p className="settings-note">Your reading preferences are kept for this session.</p>
          </div>
        ) : null}
      </aside>

      <style jsx>{`
        .book-reader { min-height: calc(100vh - 96px); background: var(--reader-bg); color: var(--reader-fg); transition: background .2s ease, color .2s ease; font-size: var(--reader-size); line-height: var(--reader-leading); }
        .reader-white { --reader-bg: #ffffff; --reader-fg: #1f2937; --reader-muted: #64748b; --reader-border: #e5e7eb; --reader-panel: rgba(255,255,255,.96); --reader-soft: #f6f8fb; --reader-accent: #245b88; }
        .reader-sepia { --reader-bg: #f6efdf; --reader-fg: #4e4032; --reader-muted: #806f5d; --reader-border: #e3d5bb; --reader-panel: rgba(250,245,234,.97); --reader-soft: #efe5d0; --reader-accent: #8a5c2c; }
        .reader-dark { --reader-bg: #171a21; --reader-fg: #e7e5e4; --reader-muted: #a8a29e; --reader-border: #343844; --reader-panel: rgba(27,30,38,.97); --reader-soft: #222631; --reader-accent: #8ab4d6; }
        .reader-header { position: sticky; top: 0; z-index: 30; height: 58px; display: flex; align-items: center; justify-content: space-between; padding: 0 18px; border-bottom: 1px solid var(--reader-border); background: var(--reader-panel); backdrop-filter: blur(14px); }
        .reader-header-title { max-width: 55%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--reader-fg); font-size: 13px; font-weight: 700; letter-spacing: .02em; }
        .reader-header-actions { display: flex; gap: 6px; }
        .reader-icon-button { display: inline-flex; align-items: center; justify-content: center; width: 34px; height: 34px; border: 0; border-radius: 999px; background: transparent; color: var(--reader-fg); cursor: pointer; transition: background .16s ease, transform .16s ease; }
        .reader-icon-button:hover { background: var(--reader-soft); }
        .reader-icon-button:active { transform: scale(.96); }
        .reader-main { position: relative; display: flex; min-height: calc(100vh - 154px); }
        .reader-content { width: min(900px, calc(100% - 80px)); margin: 0 auto; padding: 66px 32px 88px; }
        .reader-side-nav { position: fixed; top: 52%; z-index: 10; display: inline-flex; align-items: center; justify-content: center; width: 42px; height: 42px; border: 1px solid var(--reader-border); border-radius: 50%; background: var(--reader-panel); color: var(--reader-muted); cursor: pointer; box-shadow: 0 6px 20px rgba(15,23,42,.08); }
        .reader-side-nav-left { left: max(18px, calc((100vw - 980px) / 2)); }
        .reader-side-nav-right { right: max(18px, calc((100vw - 980px) / 2)); }
        .book-hero { display: grid; grid-template-columns: 205px 1fr; gap: 42px; align-items: center; margin-bottom: 76px; }
        .book-cover-wrap { position: relative; overflow: hidden; aspect-ratio: 3 / 4; border-radius: 10px; background: var(--reader-soft); box-shadow: 0 22px 44px rgba(15,23,42,.18); }
        .book-cover { position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; }
        .cover-fallback { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 9px; padding: 25px; background: radial-gradient(circle at 75% 18%, rgba(117,168,207,.85), transparent 35%), linear-gradient(145deg, #102a43, #2f6e9f 52%, #d27b5d); color: #fff; text-align: center; }
        .cover-fallback span { font-size: 22px; font-weight: 800; line-height: 1.08; letter-spacing: -.05em; }
        .cover-fallback small { font-size: 9px; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; opacity: .8; }
        .reader-eyebrow { margin: 0 0 10px; color: var(--reader-accent); font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
        .book-hero-copy h1, .reader-section-heading h2, .examples-callout h3, .drawer-header h2 { margin: 0; letter-spacing: -.04em; }
        .book-hero-copy h1 { color: var(--reader-fg); font-size: clamp(33px, 5vw, 58px); line-height: 1.04; }
        .book-author { margin: 12px 0 18px; color: var(--reader-muted); font-size: 14px; }
        .book-description { max-width: 570px; margin: 0; color: var(--reader-muted); font-size: 15px; line-height: 1.8; }
        .book-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
        .reader-primary-button, .reader-secondary-button { display: inline-flex; align-items: center; gap: 8px; border-radius: 999px; padding: 10px 16px; font-size: 13px; font-weight: 700; transition: transform .16s ease, box-shadow .16s ease; }
        .reader-primary-button { background: var(--reader-accent); color: #fff; box-shadow: 0 8px 18px rgba(36,91,136,.2); }
        .reader-secondary-button { border: 1px solid var(--reader-border); color: var(--reader-fg); }
        .reader-primary-button:hover, .reader-secondary-button:hover { transform: translateY(-1px); }
        .book-stats { display: flex; flex-wrap: wrap; gap: 20px; margin-top: 30px; color: var(--reader-muted); font-size: 11px; }
        .book-stats strong { display: block; margin-bottom: 2px; color: var(--reader-fg); font-size: 14px; }
        .reader-section-heading { display: flex; align-items: end; justify-content: space-between; gap: 16px; margin-bottom: 18px; }
        .reader-section-heading h2 { color: var(--reader-fg); font-size: 29px; }
        .chapter-count { color: var(--reader-muted); font-size: 12px; }
        .chapter-list { border-top: 1px solid var(--reader-border); }
        .chapter-row { display: flex; align-items: center; gap: 16px; min-height: 70px; border-bottom: 1px solid var(--reader-border); color: var(--reader-fg); transition: padding .18s ease, background .18s ease; }
        .chapter-row:hover { padding: 0 10px; background: var(--reader-soft); }
        .chapter-number { width: 32px; color: var(--reader-accent); font-size: 11px; font-weight: 800; letter-spacing: .08em; }
        .chapter-copy { display: flex; flex: 1; min-width: 0; flex-direction: column; gap: 4px; }
        .chapter-copy strong { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; }
        .chapter-copy small { color: var(--reader-muted); font-size: 11px; }
        .chapter-arrow { color: var(--reader-muted); }
        .reader-empty { padding: 28px 0; color: var(--reader-muted); }
        .examples-callout { display: flex; align-items: center; gap: 16px; margin-top: 48px; padding: 20px; border: 1px solid var(--reader-border); border-radius: 14px; background: var(--reader-soft); }
        .examples-callout-icon { display: inline-flex; flex: 0 0 auto; align-items: center; justify-content: center; width: 42px; height: 42px; border-radius: 11px; background: var(--reader-accent); color: white; }
        .examples-callout h3 { color: var(--reader-fg); font-size: 17px; }
        .examples-callout p:not(.reader-eyebrow) { margin: 5px 0 0; color: var(--reader-muted); font-size: 12px; line-height: 1.6; }
        .callout-link { display: inline-flex; align-items: center; gap: 2px; margin-left: auto; color: var(--reader-accent); font-size: 12px; font-weight: 800; }
        .reader-overlay { position: fixed; inset: 0; z-index: 39; background: rgba(15,23,42,.35); }
        .reader-drawer { position: fixed; top: 0; bottom: 0; left: 0; z-index: 40; width: min(380px, calc(100vw - 28px)); padding: 24px; transform: translateX(-105%); overflow-y: auto; border-right: 1px solid var(--reader-border); background: var(--reader-panel); color: var(--reader-fg); box-shadow: 18px 0 50px rgba(15,23,42,.12); transition: transform .22s cubic-bezier(.23,1,.32,1); }
        .reader-drawer.is-open { transform: translateX(0); }
        .drawer-header { display: flex; align-items: start; justify-content: space-between; margin-bottom: 24px; }
        .drawer-header h2 { font-size: 24px; }
        .drawer-nav { display: grid; gap: 4px; }
        .drawer-link { display: flex; align-items: center; gap: 10px; min-height: 42px; padding: 9px 10px; border-radius: 8px; color: var(--reader-muted); font-size: 12px; line-height: 1.35; }
        .drawer-link span { width: 22px; color: var(--reader-accent); font-size: 10px; font-weight: 800; }
        .drawer-link:hover, .drawer-link-active { background: var(--reader-soft); color: var(--reader-fg); }
        .drawer-body { color: var(--reader-fg); }
        .reader-search-field { display: flex; align-items: center; gap: 9px; padding: 11px 12px; border: 1px solid var(--reader-border); border-radius: 9px; color: var(--reader-muted); }
        .reader-search-field input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--reader-fg); font: inherit; font-size: 12px; }
        .search-result-count { margin: 17px 0 10px; color: var(--reader-muted); font-size: 11px; }
        .setting-group { padding: 18px 0; border-bottom: 1px solid var(--reader-border); }
        .setting-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 13px; color: var(--reader-fg); font-size: 12px; font-weight: 700; }
        .setting-value { color: var(--reader-muted); font-weight: 500; }
        .theme-options, .alignment-options { display: flex; gap: 8px; }
        .theme-option, .alignment-options button, .range-row button { display: inline-flex; align-items: center; gap: 7px; border: 1px solid var(--reader-border); border-radius: 8px; background: transparent; color: var(--reader-muted); padding: 8px 10px; font: inherit; font-size: 11px; cursor: pointer; }
        .theme-option.selected, .alignment-options button.selected { border-color: var(--reader-accent); color: var(--reader-fg); box-shadow: 0 0 0 2px color-mix(in srgb, var(--reader-accent) 18%, transparent); }
        .theme-swatch { width: 15px; height: 15px; border: 1px solid var(--reader-border); border-radius: 50%; }
        .range-row { display: flex; align-items: center; gap: 10px; }
        .range-row input, .full-range { flex: 1; accent-color: var(--reader-accent); }
        .settings-note { margin-top: 20px; color: var(--reader-muted); font-size: 11px; line-height: 1.6; }
        @media (max-width: 720px) { .reader-content { width: 100%; padding: 40px 20px 70px; } .reader-side-nav { display: none; } .book-hero { grid-template-columns: 1fr; gap: 28px; margin-bottom: 54px; } .book-cover-wrap { width: min(220px, 65vw); margin: 0 auto; } .book-hero-copy { text-align: center; } .book-description { margin: 0 auto; } .book-actions, .book-stats { justify-content: center; } .reader-section-heading { align-items: start; flex-direction: column; gap: 4px; } .examples-callout { align-items: start; flex-wrap: wrap; } .callout-link { width: 100%; margin-left: 58px; } }
      `}</style>
    </div>
  );
}
