import Link from 'next/link';
import { ArrowLeft, BookOpen, Code2, Hash } from 'lucide-react';
import { notFound } from 'next/navigation';
import { stories } from '@/lib/data';
import examples from '@/content/code-examples.json';

type PageProps = { params: Promise<{ storyId: string }> };

type Example = (typeof examples)[number];

const languageOrder = ['typescript', 'ts', 'java', 'bash', 'mermaid', 'text'];

function languageLabel(language: string) {
  if (language === 'ts') return 'TypeScript';
  if (language === 'text') return 'Plain text';
  return language.charAt(0).toUpperCase() + language.slice(1);
}

export default async function CodeExamplesPage({ params }: PageProps) {
  const { storyId } = await params;
  const story = stories.find((item) => item.id === storyId);
  if (!story) notFound();

  const grouped = languageOrder.map((language) => ({ language, items: examples.filter((item) => item.language === language) })).filter((group) => group.items.length > 0);
  const remaining = examples.filter((item) => !languageOrder.includes(item.language));
  if (remaining.length) grouped.push({ language: 'other', items: remaining });

  return (
    <main className="examples-page">
      <header className="examples-topbar">
        <Link href={`/stories/${storyId}`} className="examples-back"><ArrowLeft size={16} /> Back to book</Link>
        <div className="examples-brand"><Code2 size={18} /> Code &amp; examples</div>
        <span className="examples-count">{examples.length} blocks</span>
      </header>
      <div className="examples-layout">
        <aside className="examples-sidebar">
          <p className="examples-kicker">Quick reference</p>
          <h1>Code index</h1>
          <p className="examples-intro">The main code blocks and examples collected from the Software Engineering ebook, arranged by language for quick scanning.</p>
          <div className="examples-summary"><strong>{examples.length}</strong><span>code blocks</span></div>
          <nav className="examples-nav">
            {grouped.map((group) => <a href={`#language-${group.language}`} key={group.language}><Hash size={13} /> {languageLabel(group.language)} <span>{group.items.length}</span></a>)}
          </nav>
        </aside>
        <section className="examples-content">
          <div className="examples-heading">
            <p className="examples-kicker">{story.title}</p>
            <h2>Key code blocks &amp; examples</h2>
            <p>Use this page as a companion to the chapter reader. Each entry retains its original chapter, heading, context, and source code.</p>
          </div>
          {grouped.map((group) => (
            <section id={`language-${group.language}`} className="language-section" key={group.language}>
              <div className="language-heading"><h3>{languageLabel(group.language)}</h3><span>{group.items.length} examples</span></div>
              <div className="example-stack">
                {group.items.map((example, index) => <ExampleCard example={example} index={index} key={example.id} />)}
              </div>
            </section>
          ))}
          <div className="examples-footer"><Link href={`/stories/${storyId}`}><BookOpen size={16} /> Return to book details</Link></div>
        </section>
      </div>
      <style>{`
        .examples-page { min-height: calc(100vh - 100px); color: #172033; }
        .examples-topbar { position: sticky; top: 0; z-index: 20; display: flex; align-items: center; justify-content: space-between; height: 56px; padding: 0 clamp(16px, 5vw, 64px); border-bottom: 1px solid #e7eaf0; background: rgba(255,255,255,.93); backdrop-filter: blur(14px); }
        .examples-back, .examples-brand { display: inline-flex; align-items: center; gap: 8px; color: #45637f; font-size: 12px; font-weight: 700; }
        .examples-back:hover { color: #1f5d8f; }
        .examples-brand { color: #1d4d73; }
        .examples-count { color: #8290a0; font-size: 11px; }
        .examples-layout { display: grid; grid-template-columns: 260px minmax(0, 760px); gap: 60px; max-width: 1180px; margin: 0 auto; padding: 60px 28px 90px; }
        .examples-sidebar { position: sticky; top: 88px; align-self: start; }
        .examples-kicker { margin: 0 0 9px; color: #3972a1; font-size: 10px; font-weight: 800; letter-spacing: .14em; text-transform: uppercase; }
        .examples-sidebar h1, .examples-heading h2 { margin: 0; color: #172d45; letter-spacing: -.045em; }
        .examples-sidebar h1 { font-size: 34px; line-height: 1.05; }
        .examples-intro { margin: 18px 0 22px; color: #768397; font-size: 12px; line-height: 1.7; }
        .examples-summary { display: flex; align-items: baseline; gap: 8px; padding: 14px 0; border-top: 1px solid #e7eaf0; border-bottom: 1px solid #e7eaf0; }
        .examples-summary strong { color: #3972a1; font-size: 22px; }
        .examples-summary span { color: #8793a1; font-size: 11px; }
        .examples-nav { display: grid; gap: 3px; margin-top: 18px; }
        .examples-nav a { display: flex; align-items: center; gap: 6px; padding: 7px 8px; border-radius: 6px; color: #65768a; font-size: 11px; }
        .examples-nav a:hover { background: #f2f6f9; color: #1f5d8f; }
        .examples-nav span { margin-left: auto; color: #a1adba; }
        .examples-heading { padding-bottom: 35px; border-bottom: 1px solid #e7eaf0; }
        .examples-heading h2 { font-size: clamp(30px, 4vw, 47px); line-height: 1.05; }
        .examples-heading > p:last-child { max-width: 590px; margin: 16px 0 0; color: #758397; font-size: 13px; line-height: 1.7; }
        .language-section { scroll-margin-top: 78px; margin-top: 42px; }
        .language-heading { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 14px; }
        .language-heading h3 { margin: 0; color: #245b88; font-size: 20px; letter-spacing: -.03em; }
        .language-heading span { color: #96a0ac; font-size: 11px; }
        .example-stack { display: grid; gap: 14px; }
        .example-card { overflow: hidden; border: 1px solid #e4e9ef; border-radius: 10px; background: #fff; box-shadow: 0 5px 18px rgba(15,23,42,.04); }
        .example-card-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 13px 15px 11px; border-bottom: 1px solid #edf0f3; }
        .example-card-title { display: flex; align-items: center; min-width: 0; gap: 9px; }
        .example-index { display: inline-flex; align-items: center; justify-content: center; width: 23px; height: 23px; border-radius: 6px; background: #eaf2f8; color: #2b628e; font-size: 10px; font-weight: 800; }
        .example-card-title strong { overflow: hidden; color: #26394c; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; }
        .example-chapter { flex: 0 0 auto; color: #8996a4; font-size: 10px; }
        .example-context { margin: 0; padding: 12px 15px 0; color: #6b7b8d; font-size: 11px; line-height: 1.6; }
        .example-code { margin: 12px 0 0; padding: 15px; overflow-x: auto; background: #18212c; color: #e9f0f6; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', monospace; font-size: 11px; line-height: 1.55; white-space: pre-wrap; overflow-wrap: anywhere; }
        .examples-footer { margin-top: 55px; padding-top: 24px; border-top: 1px solid #e7eaf0; }
        .examples-footer a { display: inline-flex; align-items: center; gap: 8px; color: #3972a1; font-size: 12px; font-weight: 800; }
        @media (max-width: 800px) { .examples-layout { display: block; padding: 38px 18px 70px; } .examples-sidebar { position: static; margin-bottom: 45px; } .examples-nav { display: flex; flex-wrap: wrap; } .examples-nav a { background: #f4f7fa; } .example-card-header { align-items: start; flex-direction: column; gap: 7px; } .example-chapter { padding-left: 32px; } }
      `}</style>
    </main>
  );
}

function ExampleCard({ example, index }: { example: Example; index: number }) {
  return (
    <article className="example-card">
      <div className="example-card-header">
        <div className="example-card-title"><span className="example-index">{String(index + 1).padStart(2, '0')}</span><strong>{example.heading}</strong></div>
        <span className="example-chapter">{example.chapter}</span>
      </div>
      {example.context?.length ? <p className="example-context">{example.context[example.context.length - 1]}</p> : null}
      <pre className="example-code"><code>{example.code}</code></pre>
    </article>
  );
}
