"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chapters, stories } from '@/lib/data';
import React, { useMemo, useState, use } from 'react';
import ReaderControls from '@/app/components/ReaderControls';

type PageProps = {
  params: Promise<{
    storyId: string;
    chapterId: string;
  }>;
};

function getChapterDetails(storyId: string, chapterId: string) {
  const story = stories.find((s) => s.id === storyId);
  const chapter = chapters.find((c) => c.id === chapterId && c.storyId === storyId);

  if (!story || !chapter) return null;

  return {
    storyTitle: story.title,
    ...chapter,
  };
}

export default function ChapterPage({ params }: PageProps) {
  const { storyId, chapterId } = use(params);
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<string>('theme-white');

  const chapter = useMemo(() => getChapterDetails(storyId, chapterId), [storyId, chapterId]);

  if (!chapter) {
    notFound();
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
      <div className="mx-auto max-w-3xl">
        <ReaderControls fontSize={fontSize} setFontSize={setFontSize} theme={theme} setTheme={setTheme} />

        <div className="px-2 sm:px-4">
          <Link href={`/stories/${chapter.storyId}`} className="mb-4 block text-blue-600 hover:underline">
            &larr; Back to "{chapter.storyTitle}"
          </Link>

          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">{chapter.title}</h1>
          <p className="mb-8 text-base text-gray-500">Chapter {chapter.chapterNumber}</p>

          <div
            className="prose max-w-none lg:prose-xl"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </div>
      </div>
    </div>
  );
}
