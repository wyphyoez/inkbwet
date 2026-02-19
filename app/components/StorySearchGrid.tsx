"use client";

import { Search, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

export interface StoryCardData {
  id: string;
  title: string;
  authorName: string;
  description: string;
  coverImage: string;
}

interface StorySearchGridProps {
  stories: StoryCardData[];
}

export default function StorySearchGrid({ stories }: StorySearchGridProps) {
  const [query, setQuery] = useState('');

  const filteredStories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return stories;
    }

    return stories.filter((story) => {
      return (
        story.title.toLowerCase().includes(normalizedQuery) ||
        story.authorName.toLowerCase().includes(normalizedQuery) ||
        story.description.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [stories, query]);

  return (
    <section className="space-y-5">
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search stories, authors, or descriptions..."
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 md:text-base"
          aria-label="Search stories"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      {filteredStories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <p className="text-sm text-gray-600 md:text-base">No stories found for "{query}".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStories.map((story) => (
            <Link
              href={`/stories/${story.id}`}
              key={story.id}
              className="group overflow-hidden rounded-lg border shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="overflow-hidden">
                <Image
                  src={story.coverImage}
                  alt={story.title}
                  width={400}
                  height={300}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="bg-white p-4">
                <h2 className="mb-2 text-xl font-semibold text-gray-900">{story.title}</h2>
                <p className="mb-2 text-sm text-gray-600">By {story.authorName}</p>
                <p className="line-clamp-2 text-sm text-gray-700">{story.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
