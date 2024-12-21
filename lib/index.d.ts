export interface SimplifiedPost {
  id: string;
  tone: string;
  topic: string;
  tags: string[];
  caption: string;
  likes: number;
  postCreatedAt: string;
  user: {
    captions: { [key: string]: any }[];
    name: string;
    avatar: string;
    isLiked: boolean;
  };
}
