import Link from 'next/link';
import Image from 'next/image';
import { stories, users } from '@/lib/data';
import type { Story } from '@/lib/data';

interface StoryWithAuthor extends Story {
  authorName: string;
}

function getStoriesWithAuthors(): StoryWithAuthor[] {
  return stories.map((story) => {
    const author = users.find((user) => user.id === story.authorId);
    return {
      ...story,
      authorName: author ? author.name : 'Unknown Author',
    };
  });
}

export default function HomePage() {
  const allStories = getStoriesWithAuthors();

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-800 sm:mb-6 sm:text-3xl">Featured Stories</h1>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allStories.map((story) => (
          <Link
            href={`/stories/${story.id}`}
            key={story.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.title}
                width={400}
                height={300}
                className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-48"
              />
            </div>
            <div className="p-4">
              <h2 className="mb-1 line-clamp-1 text-lg font-semibold text-slate-900 sm:text-xl">{story.title}</h2>
              <p className="mb-2 text-xs text-slate-500 sm:text-sm">By {story.authorName}</p>
              <p className="line-clamp-2 text-sm text-slate-700">{story.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
