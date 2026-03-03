import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stories } from '@/lib/data';

type PageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

function getStory(storyId: string) {
  return stories.find((s) => s.id === storyId);
}

export default async function NewChapterPage({ params }: PageProps) {
  const { storyId } = await params;
  const story = getStory(storyId);

  if (!story) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="text-sm text-blue-600 hover:underline mb-2 block"
      >
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold mb-1 text-gray-900">Write a New Chapter</h1>
      <p className="text-lg text-gray-500 mb-6">
        For Story: "{story.title}"
      </p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg text-lg font-semibold focus:ring-blue-500 focus:border-blue-500"
          placeholder="Chapter Title (e.g., Chapter 1: The Encounter)"
        />

        {/* This <textarea> simulates the rich text editor */}
        <textarea
          rows={20}
          className="w-full p-4 border border-gray-300 rounded-lg font-serif focus:ring-blue-500 focus:border-blue-500"
          placeholder="Your story begins here..."
        ></textarea>

        <div className="flex justify-end items-center gap-3 mt-4">
          <button
            type="button"
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg hover:bg-gray-300 font-medium transition-colors"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 font-semibold transition-colors"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}