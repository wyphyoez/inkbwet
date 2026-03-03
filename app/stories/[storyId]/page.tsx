import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { stories, users, chapters } from '@/lib/data';

type PageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

function getStoryDetails(storyId: string) {
  const story = stories.find((s) => s.id === storyId);
  if (!story) return null;

  const author = users.find((u) => u.id === story.authorId);
  const storyChapters = chapters.filter((c) => c.storyId === storyId).sort((a, b) => a.chapterNumber - b.chapterNumber);

  return {
    ...story,
    authorName: author ? author.name : 'Unknown',
    chapters: storyChapters,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { storyId } = await params;
  const story = getStoryDetails(storyId);

  if (!story) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-8 flex flex-col gap-5 sm:gap-8 md:flex-row">
        <Image
          src={story.coverImage}
          alt={story.title}
          width={300}
          height={450}
          className="w-full rounded-xl object-cover shadow-md md:w-1/3"
        />
        <div className="flex-1">
          <h1 className="mb-2 text-3xl font-bold text-slate-900 sm:text-4xl">{story.title}</h1>
          <p className="mb-4 text-base text-slate-600 sm:text-xl">By {story.authorName}</p>
          <p className="leading-relaxed text-slate-700">{story.description}</p>
        </div>
      </div>

      <hr className="my-6 border-slate-200" />

      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Chapters</h2>
      <div className="flex flex-col gap-3">
        {story.chapters.length > 0 ? (
          story.chapters.map((chapter) => (
            <Link
              href={`/stories/${story.id}/chapters/${chapter.id}`}
              key={chapter.id}
              className="block rounded-xl border border-slate-200 bg-white p-4 transition-colors hover:bg-slate-50"
            >
              <h3 className="text-base font-medium text-blue-700 sm:text-lg">{chapter.title}</h3>
              <p className="text-sm text-slate-500">Chapter {chapter.chapterNumber}</p>
            </Link>
          ))
        ) : (
          <p className="text-slate-500">No chapters have been published for this story yet.</p>
        )}
      </div>
    </div>
  );
}
