import React from 'react';

const CreateStoryPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Story</h1>

      <form className="flex flex-col gap-6 p-6 border rounded-lg bg-gray-50">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Story Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., The Last Dragon"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Synopsis / Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="A brief summary of what your story is about..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="cover" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image (URL)
          </label>
          <input
            type="text"
            id="cover"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://your-image-url.com/cover.jpg"
          />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Genre
          </label>
          <select id="genre" className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500">
            <option>Select a genre</option>
            <option>Romance</option>
            <option>Mystery</option>
            <option>Fantasy</option>
            <option>Science Fiction</option>
            <option>Thriller</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Start Writing
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStoryPage;