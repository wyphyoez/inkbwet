import Link from 'next/link';
import { stories, chapters, currentUser } from '@/lib/data';
import { Plus, Edit, BookOpen } from 'lucide-react';

function getMyStories() {
  const myStories = stories.filter(
    (story) => story.authorId === currentUser.id
  );
  return myStories.map((story) => {
    const storyChapters = chapters.filter((c) => c.storyId === story.id);
    return {
      ...story,
      chapterCount: storyChapters.length,
    };
  });
}

export default function DashboardPage() {
  const myStories = getMyStories();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Stories</h1>
        <Link
          href="/dashboard/create"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          <span>Write New Story</span>
        </Link>
      </div>

      <div className="flex flex-col gap-4">
        {myStories.length > 0 ? (
           myStories.map((story) => (
            <div
              key={story.id}
              className="border rounded-lg p-4 flex justify-between items-center shadow-sm bg-white"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{story.title}</h2>
                <p className="text-sm text-gray-500">
                  Chapters: {story.chapterCount}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/stories/${story.id}`}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="View Story"
                >
                  <BookOpen size={18} />
                </Link>
                <Link
                  href="#"
                  className="p-2 text-gray-600 hover:text-green-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="Edit Story"
                >
                  <Edit size={18} />
                </Link>
                 <Link
                  href={`/dashboard/stories/${story.id}/chapters/new`}
                  className="p-2 text-gray-600 hover:text-blue-600 rounded-full hover:bg-gray-100 transition-colors"
                  title="Add New Chapter"
                >
                  <Plus size={18} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-medium text-gray-700">You haven't written any stories yet.</h2>
            <p className="text-gray-500 mt-2 mb-4">Let's change that!</p>
            <Link
              href="/dashboard/create"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              <span>Write Your First Story</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}