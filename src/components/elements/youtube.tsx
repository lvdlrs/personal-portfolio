import { getVideoId } from "@/lib/get-video-id";
import { YouTubeEmbed } from "@next/third-parties/google";

export function YouTube(props: {
  url: string;
  title?: string;
  thumbnail?: string;
}) {
  const { id, service } = getVideoId(props.url);

  if (service !== "youtube" || !id) {
    return null;
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg">
      <YouTubeEmbed videoid={id} />
    </div>
  );
}
