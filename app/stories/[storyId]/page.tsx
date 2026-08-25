import { notFound } from 'next/navigation';
import { chapters, stories, users } from '@/lib/data';
import BookDetailsReader from '@/app/components/BookDetailsReader';

type PageProps = {
  params: Promise<{ storyId: string }>;
};

function getStoryDetails(storyId: string) {
  const story = stories.find((item) => item.id === storyId);
  if (!story) return null;

  const author = users.find((user) => user.id === story.authorId);
  return {
    ...story,
    authorName: author?.name ?? 'Unknown author',
    chapters: chapters.filter((chapter) => chapter.storyId === storyId).sort((a, b) => a.chapterNumber - b.chapterNumber),
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { storyId } = await params;
  const story = getStoryDetails(storyId);

  if (!story) notFound();

  return <BookDetailsReader story={story} chapters={story.chapters} />;
}
