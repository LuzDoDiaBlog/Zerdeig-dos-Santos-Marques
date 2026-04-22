export interface Message {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image?: string;
}

export type Category = 'Oração' | 'Reflexão' | 'Gratidão' | 'Motivação' | 'Paz';
