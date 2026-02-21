"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import ReaderControls from '@/app/components/ReaderControls';
import { chapters, stories } from '@/lib/data';

type ChapterPageClientProps = {
  storyId: string;
  chapterId: string;
};

function getChapterDetails(storyId: string, chapterId: string) {
  const story = stories.find((s) => s.id === storyId);
  const chapter = chapters.find((c) => c.id === chapterId && c.storyId === storyId);

  if (!story || !chapter) return null;

  return {
    ...chapter,
    storyTitle: story.title,
  };
}

export default function ChapterPageClient({ storyId, chapterId }: ChapterPageClientProps) {
  const [fontSize, setFontSize] = useState<number>(18);
  const [theme, setTheme] = useState<string>('theme-white');

  const chapter = useMemo(() => getChapterDetails(storyId, chapterId), [storyId, chapterId]);

  if (!chapter) {
    notFound();
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme}`}>
      <div className="max-w-3xl mx-auto">
        <ReaderControls
          fontSize={fontSize}
          setFontSize={setFontSize}
          theme={theme}
          setTheme={setTheme}
        />

        <div className="px-4">
          <Link
            href={`/stories/${storyId}`}
            className="text-blue-600 hover:underline mb-4 block"
          >
            &larr; Back to "{chapter.storyTitle}"
          </Link>

          <h1 className="text-4xl font-bold mb-2">{chapter.title}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Chapter {chapter.chapterNumber}
          </p>

          <div
            className="prose lg:prose-xl max-w-none"
            style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </div>
      </div>
    </div>
  );
}
