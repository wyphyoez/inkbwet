import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3, Feather, Sparkles } from 'lucide-react';
import { stories, users } from '@/lib/data';
import type { Story } from '@/lib/data';
import { Badge, Button, Card } from '@/app/components/ui';

interface StoryWithAuthor extends Story { authorName: string; }

function getStoriesWithAuthors(): StoryWithAuthor[] {
  return stories.map((story) => ({ ...story, authorName: users.find((user) => user.id === story.authorId)?.name ?? 'Unknown author' }));
}

export default function HomePage() {
  const allStories = getStoriesWithAuthors();
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl bg-slate-950 px-6 py-12 text-white shadow-xl sm:px-10 sm:py-16 lg:px-16">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <Badge className="mb-6 border-white/15 bg-white/10 text-indigo-100"><Sparkles size={13} className="mr-1.5" /> A home for unfinished worlds</Badge>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">Stories worth <span className="text-indigo-300">staying for.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Discover episodic fiction from curious writers, follow the ones that pull you in, and make a little room for wonder every day.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="#featured"><Button size="lg" className="bg-white text-slate-950 hover:bg-indigo-50">Start reading <ArrowRight size={17} /></Button></Link><Link href="/dashboard/create"><Button size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"><Feather size={17} /> Share your story</Button></Link></div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400"><span className="flex items-center gap-2"><BookOpen size={16} className="text-indigo-300" /> 2,400+ stories</span><span className="flex items-center gap-2"><Clock3 size={16} className="text-indigo-300" /> Read at your pace</span></div>
        </div>
      </section>

      <section id="featured" className="scroll-mt-24">
        <div className="mb-6 flex items-end justify-between gap-4"><div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Curated for you</p><h2 className="text-3xl font-bold">Featured stories</h2></div><Link href="/" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:flex">Browse all <ArrowRight size={15} /></Link></div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {allStories.map((story, index) => (
            <Link href={`/stories/${story.id}`} key={story.id} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-indigo-200 group-hover:shadow-lg">
                <div className="grid h-full sm:grid-cols-[42%_58%]">
                  <div className="relative min-h-52 overflow-hidden bg-muted"><Image src={story.coverImage} alt={story.title} fill sizes="(max-width: 640px) 100vw, 42vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute left-3 top-3"><Badge className="border-white/20 bg-slate-950/60 text-white">0{index + 1}</Badge></div></div>
                  <div className="flex flex-col justify-between p-5 sm:p-6"><div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Serial fiction</p><h3 className="text-2xl font-bold group-hover:text-primary">{story.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">{story.description}</p></div><div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-sm"><span className="text-muted-foreground">By <span className="font-semibold text-foreground">{story.authorName}</span></span><span className="flex items-center gap-1 font-semibold text-primary">Read <ArrowRight size={14} /></span></div></div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3"><Card className="p-5"><p className="text-3xl font-bold text-primary">12 min</p><p className="mt-1 text-sm text-muted-foreground">Average chapter length</p></Card><Card className="p-5"><p className="text-3xl font-bold text-primary">Weekly</p><p className="mt-1 text-sm text-muted-foreground">Fresh chapters to discover</p></Card><Card className="p-5"><p className="text-3xl font-bold text-primary">100%</p><p className="mt-1 text-sm text-muted-foreground">Room for your imagination</p></Card></section>
    </div>
  );
}
