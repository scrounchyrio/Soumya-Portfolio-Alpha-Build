export interface ResumeMediaItem {
  id: string;
  src: string;
  type: "image" | "video";
  alt?: string;
  poster?: string;
  caption?: string;
  href?: string;
}

export type ResumeMediaMetadata = Pick<
  ResumeMediaItem,
  "alt" | "poster" | "caption" | "href"
>;
