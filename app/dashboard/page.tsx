import Link from 'next/link';
import { stories, chapters, currentUser } from '@/lib/data';
import { Plus, Edit, BookOpen } from 'lucide-react';

function getMyStories() {
  const myStories = stories.filter((story) => story.authorId === currentUser.id);
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
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">My Stories</h1>
        <Link
          href="/dashboard/create"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          <span>Write New Story</span>
        </Link>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        {myStories.length > 0 ? (
          myStories.map((story) => (
            <div
              key={story.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">{story.title}</h2>
                <p className="text-sm text-slate-500">Chapters: {story.chapterCount}</p>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link href={`/stories/${story.id}`} className="rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-blue-600" title="View Story">
                  <BookOpen size={18} />
                </Link>
                <Link href="#" className="rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-green-600" title="Edit Story">
                  <Edit size={18} />
                </Link>
                <Link
                  href={`/dashboard/stories/${story.id}/chapters/new`}
                  className="rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-blue-600"
                  title="Add New Chapter"
                >
                  <Plus size={18} />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border-2 border-dashed border-slate-300 py-12 text-center">
            <h2 className="text-xl font-medium text-slate-700">You haven't written any stories yet.</h2>
            <p className="mb-4 mt-2 text-slate-500">Let's change that!</p>
            <Link href="/dashboard/create" className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              <Plus size={18} />
              <span>Write Your First Story</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
