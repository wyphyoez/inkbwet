"use client"; // This page is now interactive

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { chapters, stories } from '@/lib/data';
import React, { useState, useMemo } from 'react';
import ReaderControls from '@/app/components/ReaderControls';

type PageProps = {
  params: {
    storyId: string;
    chapterId: string;
  };
};

// Data fetching can be memoized for performance
function getChapterDetails(storyId: string, chapterId: string) {
  const story = stories.find((s) => s.id === storyId);
  const chapter = chapters.find((c) => c.id === chapterId && c.storyId === storyId);

  if (!story || !chapter) return null;

  return {
    storyTitle: story.title,
    storyId: story.id,
    ...chapter,
  };
}

export default function ChapterPage({ params }: PageProps) {
  // State for reader preferences
  const [fontSize, setFontSize] = useState<number>(18); // Default font size in px
  const [theme, setTheme] = useState<string>('theme-white'); // Default theme class

  // useMemo will prevent re-calculating this on every render unless params change
  const chapter = useMemo(() => getChapterDetails(params.storyId, params.chapterId), [params.storyId, params.chapterId]);
  
  if (!chapter) {
    notFound();
  }

  return (
    // The entire page is wrapped in the theme class for background/text color
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
                href={`/stories/${chapter.storyId}`}
                className="text-blue-600 hover:underline mb-4 block"
            >
                &larr; Back to "{chapter.storyTitle}"
            </Link>

            <h1 className="text-4xl font-bold mb-2">{chapter.title}</h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">Chapter {chapter.chapterNumber}</p>
            
            <div
                className="prose lg:prose-xl max-w-none"
                style={{ fontSize: `${fontSize}px`, lineHeight: 1.8 }} // Apply dynamic font size and line height
                dangerouslySetInnerHTML={{ __html: chapter.content }}
            />
        </div>
       </div>
    </div>
  );
}