export interface SimplifiedPost {
  id: string;
  tone: string;
  topic: string;
  tags: string[];
  caption: string;
  postCreatedAt: string;
  user: {
    captions: { [key: string]: any }[];
    name: string;
  };
}
