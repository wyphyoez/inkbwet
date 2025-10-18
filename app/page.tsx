import Link from 'next/link';
import Image from 'next/image';
import { stories, users } from '@/lib/data';
import type { Story, User } from '@/lib/data';

// A type for the combined story and author data
interface StoryWithAuthor extends Story {
  authorName: string;
}

// Data fetching function (replaces a real database call)
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Featured Stories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allStories.map((story) => (
          <Link
            href={`/stories/${story.id}`}
            key={story.id}
            className="border group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="overflow-hidden">
              <Image
                src={story.coverImage}
                alt={story.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">{story.title}</h2>
              <p className="text-gray-600 mb-2 text-sm">By {story.authorName}</p>
              <p className="text-gray-700 text-sm line-clamp-2">{story.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}