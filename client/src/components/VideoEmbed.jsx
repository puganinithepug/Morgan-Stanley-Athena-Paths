import React, { useEffect, useRef } from "react";

// Shared helper to load the YouTube Iframe API once and resolve when ready
function loadYouTubeAPI() {
  return new Promise((resolve, reject) => {
    // Check if YT is already loaded and Player is available
    if (window.YT && window.YT.Player && typeof window.YT.Player === "function") {
      resolve(window.YT);
      return;
    }

    // If script is already being loaded, wait for it
    if (window.onYouTubeIframeAPIReady) {
      const originalCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        originalCallback();
        if (window.YT && window.YT.Player && typeof window.YT.Player === "function") {
          resolve(window.YT);
        } else {
          reject(new Error("YouTube API loaded but Player constructor not available"));
        }
      };
      return;
    }

    // Load the script
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => reject(new Error("Failed to load YouTube API"));
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      if (window.YT && window.YT.Player && typeof window.YT.Player === "function") {
        resolve(window.YT);
      } else {
        reject(new Error("YouTube API loaded but Player constructor not available"));
      }
    };
  });
}

// Reusable video embed that auto-plays when in view and pauses when scrolled away
export default function VideoEmbed({ videoId }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const playerIdRef = useRef(`youtube-player-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    let observer;
    let player;
    let isMounted = true;

    loadYouTubeAPI()
      .then((YT) => {
        if (!isMounted) return;

        // Ensure the element exists and has an ID before creating the player
        if (!playerRef.current) {
          console.warn("Player element not found");
          return;
        }

        if (!playerRef.current.id) {
          playerRef.current.id = playerIdRef.current;
        }

        // Verify YT.Player is still available (race condition check)
        if (!YT.Player || typeof YT.Player !== "function") {
          console.error("YT.Player is not a constructor");
          return;
        }

        // Use the element ID string instead of the element directly
        const elementId = playerRef.current.id;

        try {
          player = new YT.Player(elementId, {
            videoId,
            playerVars: {
              autoplay: 0,
              controls: 1,
              mute: 1,
              playsinline: 1,
            },
            events: {
              onReady: () => {
                if (!isMounted || !player) return;

                observer = new IntersectionObserver(
                  (entries) => {
                    entries.forEach((entry) => {
                      if (entry.isIntersecting) {
                        // Video is in view - play it
                        if (player && typeof player.playVideo === "function") {
                          player.playVideo();
                        }
                      } else {
                        // Video is out of view - pause it
                        if (player && typeof player.pauseVideo === "function") {
                          player.pauseVideo();
                        }
                      }
                    });
                  },
                  { threshold: 0.5 }
                );

                if (containerRef.current) {
                  observer.observe(containerRef.current);
                }
              },
              onError: (event) => {
                console.error("YouTube player error:", event.data);
              },
            },
          });
        } catch (error) {
          console.error("Error creating YouTube player:", error);
        }
      })
      .catch((error) => {
        console.error("Failed to load YouTube API:", error);
      });

    return () => {
      isMounted = false;
      observer?.disconnect();
      if (player && typeof player.destroy === "function") {
        try {
          player.destroy();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [videoId]);

  return (
    <div
      ref={containerRef}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <div
          id={playerIdRef.current}
          ref={playerRef}
          className="absolute top-0 left-0 w-full h-full rounded-xl shadow-xl"
        />
      </div>
    </div>
  );
}
