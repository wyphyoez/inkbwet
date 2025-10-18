// Step 1: Define the types for our data structures
export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  authorId: string;
  coverImage: string;
}

export interface Chapter {
  id: string;
  storyId: string;
  chapterNumber: number;
  title: string;
  content: string; // HTML content as a string
}

// Step 2: Create typed dummy data

// Sample users
export const users: User[] = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com' },
  { id: 'u2', name: 'Jane Smith', email: 'jane@example.com' },
];

// Sample stories
export const stories: Story[] = [
  {
    id: 's1',
    title: 'Echoes of the Void',
    description: 'A lone traveler discovers ancient secrets in a desolate wasteland.',
    authorId: 'u1',
    coverImage: 'https://placehold.co/400x300/6366f1/white?text=Echoes',
  },
  {
    id: 's2',
    title: 'The Crimson Bloom',
    description: 'In a city powered by magic, a rare flower holds the key to a conspiracy.',
    authorId: 'u2',
    coverImage: 'https://placehold.co/400x300/ec4899/white?text=Bloom',
  },
];

// Sample chapters for stories
export const chapters: Chapter[] = [
  // Story 1 Chapters
  {
    id: 'c1',
    storyId: 's1',
    chapterNumber: 1,
    title: 'Chapter 1 - The Arrival',
    content: `
      <p>The twin suns beat down on the cracked earth. Dust was a constant companion, a gritty film on everything John touched.</p>
      <p>He pulled his scarf tighter, his gaze fixed on the shimmering horizon. This was it, the place the old maps called "The Silence". (Lorem ipsum dolor sit amet, consectetur adipiscing elit.)</p>
    `,
  },
  {
    id: 'c2',
    storyId: 's1',
    chapterNumber: 2,
    title: 'Chapter 2 - Whispers in the Ruins',
    content: `
      <p>The ruins were larger than he had imagined, skeletal structures clawing at the sky.</p>
      <p>A strange energy hummed in the air, a low thrum that resonated deep in his bones. (Proin eget tortor risus. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.)</p>
    `,
  },
  // Story 2 Chapters
  {
    id: 'c3',
    storyId: 's2',
    chapterNumber: 1,
    title: 'Chapter 1 - A Gilded Cage',
    content: `
      <p>Aethelburg was a city of wonders, with crystal towers that pierced the clouds and rivers of pure mana flowing through its streets.</p>
      <p>But for Elara, it was a prison. (Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.)</p>
    `,
  },
];

// Simulate a logged-in user for the dashboard
export const currentUser: User = {
  id: 'u1',
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'A passionate writer turning the loneliness of the city into ink drops.',
  avatar: 'https://i.pravatar.cc/150?u=u1',
};