export type session_data = {
  userId: string,
  email: string,
  role: number,
  avatar_url: string | null
}

export type PageData = {
  pageTitle: string,
  pageText: string,
  authorId: number
}

export type EventData = {
  id: string;
  title: string;
  type: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  location: string;
  organizer: string;
  image: string | null;
  description: string | null;
  creatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
};
