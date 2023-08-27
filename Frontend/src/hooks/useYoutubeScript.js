import { useState, useEffect } from "react";

// Iframe API Link
const YOUTUBE_PLAYER_API = "https://www.youtube.com/iframe_api";

export default function useYoutubeScript(scriptId) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(
    () => {
      // if youtube is already available in window return.

      if (window.YT) {
        return [true, false];
      }

      // Create script tag, add ID and source to it.
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = YOUTUBE_PLAYER_API;

      // Youtube promotes adding the script at the top.
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

      /* 
         Youtube API fires 'onYouTubeIframeAPIReady' when API 
         is loaded
      */

      window.onYouTubeIframeAPIReady = () => {
        // fire when script is loaded
        onScriptLoad();
      };

      const onScriptLoad = () => {
        setState({
          loaded: true,
          error: false
        });
      };

      const onScriptError = () => {
        setState({
          loaded: true,
          error: true
        });
      };

      // Listen when script has caused any error
      script.addEventListener("error", onScriptError);

      // Remove event listeners on cleanup
      return () => {
        script.removeEventListener("error", onScriptError);
        const currentYoutubeScript = document.getElementById(scriptId);
        currentYoutubeScript && document.head.removeChild(currentYoutubeScript);
      };
    },
    [scriptId] // Only re-run effect if script src changes
  );

  return [state.loaded, state.error];
}
