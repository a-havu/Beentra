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
  publicCreatorId: string | null;
  maxSpots: number;
  subscriberCount: number;
  isSubscribed: boolean;
};

export type LocalProject = {
  id: string;
  projectName: string;
  oneLiner: string;
  link: string | null;
  techStack: string | null;
  description: string | null;
  createdAt: Date;
  creatorId: string | null;
  image: string | null;
  imagekitFileId: string | null;
  creator: { id: string; username: string; fullName: string | null } | null;
};

export type Project = {
  id: string;
  projectName: string;
  oneLiner: string;
  techStack?: string | null;
  link?: string | null;
  description?: string | null;
  creator?: { username: string } | null;
  image?: string | null;
  createdAt: string | Date;
};
