export type session_data = {
  userId: string;
  email: string;
  role: number;
  avatar_url: string | null;
};

export type PageData = {
  pageTitle: string;
  pageText: string;
  authorId: number;
};

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

type LocalProject = {
  id: string;
  projectName: string;
  oneLiner: string;
  link: string | null;
  techStack: string | null;
  description: string | null;
  createdAt: Date;
  creatorId: string | null;
  image: string | null;
  imageKitId: string | null;
  imagekitFileId: string | null;
  creator: { id: string; username: string; fullName: string | null } | null;
};
