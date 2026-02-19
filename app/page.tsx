import { stories, users } from '@/lib/data';
import type { Story } from '@/lib/data';
import StorySearchGrid, { type StoryCardData } from '@/app/components/StorySearchGrid';

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
  const storyCards: StoryCardData[] = allStories.map((story) => ({
    id: story.id,
    title: story.title,
    authorName: story.authorName,
    description: story.description,
    coverImage: story.coverImage,
  }));

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-gray-800">Featured Stories</h1>
      <p className="mb-6 text-sm text-gray-600 md:text-base">
        Discover your next Myanmar episodic story.
      </p>
      <StorySearchGrid stories={storyCards} />
    </div>
  );
}
