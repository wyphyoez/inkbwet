import React from 'react';

const CreateStoryPage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="mb-5 text-2xl font-bold text-slate-800 sm:mb-6 sm:text-3xl">Create a New Story</h1>

      <form className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:gap-6 sm:p-6">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
            Story Title
          </label>
          <input type="text" id="title" className="w-full rounded-lg border border-slate-300 p-3" placeholder="e.g., The Last Dragon" />
        </div>

        <div>
          <label htmlFor="description" className="mb-1 block text-sm font-medium text-slate-700">
            Synopsis / Description
          </label>
          <textarea id="description" rows={4} className="w-full rounded-lg border border-slate-300 p-3" placeholder="A brief summary of what your story is about..." />
        </div>

        <div>
          <label htmlFor="cover" className="mb-1 block text-sm font-medium text-slate-700">
            Cover Image (URL)
          </label>
          <input type="text" id="cover" className="w-full rounded-lg border border-slate-300 p-3" placeholder="https://your-image-url.com/cover.jpg" />
        </div>

        <div>
          <label htmlFor="genre" className="mb-1 block text-sm font-medium text-slate-700">
            Genre
          </label>
          <select id="genre" className="w-full rounded-lg border border-slate-300 bg-white p-3">
            <option>Select a genre</option>
            <option>Romance</option>
            <option>Mystery</option>
            <option>Fantasy</option>
            <option>Science Fiction</option>
            <option>Thriller</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 sm:w-auto">
            Start Writing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStoryPage;
