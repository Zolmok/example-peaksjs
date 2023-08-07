import { useEffect, useRef, useState } from 'react';

import Peaks from 'peaks.js';

import './project.scss';

export default function Project() {
  const zoomviewContainer = useRef(null);
  const overviewContainer = useRef(null);
  const audio = useRef(null);
  const [peaksInstance, setPeaksInstance] = useState(null);
  const [playbackTime, setPlaybackTime] = useState(0);

  const onPlay = () => {
    peaksInstance.player.play();
  };
  const onPause = () => {
    peaksInstance.player.pause();
  };

  useEffect(() => {
    const options = {
      zoomview: {
        container: zoomviewContainer.current,
      },
      overview: {
        container: overviewContainer.current,
      },
      mediaElement: audio.current,
      dataUri: {
        arraybuffer: 'sample.dat', // or json: 'sample.json'
      },
    };

    Peaks.init(options, function (err, peaks) {
      if (err) {
        console.error('Failed to initialize Peaks instance: ' + err.message);
        return;
      }

      setPeaksInstance(peaks);

      peaks.on('player.timeupdate', function (time) {
        setPlaybackTime(Math.round(time * 1000) / 1000);
      });
    });
  }, []);

  return (
    <>
      <div className="controls">
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <div className="time">
          Current playback time: {playbackTime} seconds
        </div>
      </div>
      <div className="zoomview-container" ref={zoomviewContainer}></div>
      <div className="overview-container" ref={overviewContainer}></div>
      <audio className="audio" ref={audio}>
        <source src="sample.mp3" type="audio/mpeg" />
      </audio>
    </>
  );
}
