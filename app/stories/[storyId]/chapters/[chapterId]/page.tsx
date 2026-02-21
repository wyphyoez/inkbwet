import ChapterPageClient from './ChapterPageClient';

type PageProps = {
  params: Promise<{
    storyId: string;
    chapterId: string;
  }>;
};

export default async function ChapterPage({ params }: PageProps) {
  const { storyId, chapterId } = await params;

  return <ChapterPageClient storyId={storyId} chapterId={chapterId} />;
}
