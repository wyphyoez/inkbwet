import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { stories, users, chapters } from '@/lib/data';

// Define the type for the props
type PageProps = {
  params: {
    storyId: string;
  };
};

// Data fetching function
function getStoryDetails(storyId: string) {
  const story = stories.find((s) => s.id === storyId);
  if (!story) return null;

  const author = users.find((u) => u.id === story.authorId);
  const storyChapters = chapters
    .filter((c) => c.storyId === storyId)
    .sort((a, b) => a.chapterNumber - b.chapterNumber);

  return {
    ...story,
    authorName: author ? author.name : 'Unknown',
    chapters: storyChapters,
  };
}

export default function StoryDetailPage({ params }: PageProps) {
  const story = getStoryDetails(params.storyId);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <Image
          src={story.coverImage}
          alt={story.title}
          width={300}
          height={450}
          className="rounded-lg shadow-lg object-cover w-full md:w-1/3"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">{story.title}</h1>
          <p className="text-xl text-gray-600 mb-4">By {story.authorName}</p>
          <p className="text-gray-700 leading-relaxed">{story.description}</p>
        </div>
      </div>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
      <div className="flex flex-col gap-3">
        {story.chapters.length > 0 ? (
          story.chapters.map((chapter) => (
            <Link
              href={`/stories/${story.id}/chapters/${chapter.id}`}
              key={chapter.id}
              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-lg font-medium text-blue-700">
                {chapter.title}
              </h3>
              <p className="text-sm text-gray-500">Chapter {chapter.chapterNumber}</p>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No chapters have been published for this story yet.</p>
        )}
      </div>
    </div>
  );
}