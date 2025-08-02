import React, { useEffect, useRef} from 'react';
import { useLocation } from 'react-router';
import RenderSeats from './ShowSeats';

const CinemaSeatPreview: React.FC = () => {
  const playerRef = useRef<HTMLDivElement>(null);
  const {state} = useLocation();

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      new (window as any).YT.Player(playerRef.current, {
        height: '400',
        width: '100%',
        videoId: 'YoHD9XEInc0',
        playerVars: {
          autoplay: 1,
          mute: 0,
          controls: 1,
          modestbranding: 1,
          rel: 0
        },
        events: {
          onReady: (event: any) => {
            event.target.setVolume(10);
            event.target.playVideo();
          }
        }
      });
    };
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col items-center overflow-y-auto text-white bg-gradient-to-b from-gray-900 via-black to-black">

      <div className="w-full max-w-5xl mt-6 px-4">
        <div
          className="bg-white rounded-xl overflow-hidden shadow-xl"
          style={{
            animation: 'glow 2s ease-in-out infinite alternate',
            borderRadius: '0.75rem'
          }}
        >
          <div id="player" ref={playerRef} />
        </div>
      </div>

      <div className="relative w-full max-w-5xl mt-6 px-4 pb-20">
        <div
          className="absolute bottom-0 w-full h-full z-0 opacity-20 my-4"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #222,
              #222 10px,
              #1a1a1a 10px,
              #1a1a1a 20px
            )`
          }}
        ></div>
        <RenderSeats seats={state} />
      </div>
    </div>
  );
};

export default CinemaSeatPreview;
