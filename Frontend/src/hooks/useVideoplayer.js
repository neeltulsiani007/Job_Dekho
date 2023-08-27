import {Media, Video } from '@vidstack/player-react';

export function VidStack() {
  return (
    <Media>
  <Video loading="visible" poster="https://media-files.vidstack.io/poster.png" controls preload="true">
    <video loading="visible" poster="https://media-files.vidstack.io/poster-seo.png" src="./video.mp4" preload="none" data-video="0" controls />
  </Video>
</Media>
  );
}