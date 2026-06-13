// took some ai help in this pls forgive me yawrr

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Music, Radio } from 'lucide-react';

const songsList = [
  { id: 1, title: "SPECIAL Music", artist: "aariboyi6", src: "/song1.mp3" },
  { id: 2, title: "Its ..... then", artist: "Mufasa :)", src: "/song2.mp3" },
  { id: 3, title: "F1", artist: "didnt found the theme sond download sorry :>", src: "/song3.mp3" },
];

export default function MusicPlayer() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [volume, setVolume] = useState(60);

  const currentSong = songsList[trackIndex];
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(function(error) {
          setIsPlaying(false);
        });
      }
    }
  }, [trackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const nextTrack = () => {
    setCurrentTime(0);
    let nextIndex = trackIndex + 1;
    if (nextIndex >= songsList.length) {
      nextIndex = 0;
    }
    setTrackIndex(nextIndex);
  };

  const prevTrack = () => {
    setCurrentTime(0);
    let prevIndex = trackIndex - 1;
    if (prevIndex < 0) {
      prevIndex = songsList.length - 1;
    }
    setTrackIndex(prevIndex);
  };

  const changeProgress = (e) => {
    const targetTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = targetTime;
    }
    setCurrentTime(targetTime);
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const loadMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(Math.floor(audioRef.current.duration));
    }
  };

  const convertSecondsToTime = (secondsTotal) => {
    if (!secondsTotal || isNaN(secondsTotal)) {
      return "00:00";
    }
    const mins = Math.floor(secondsTotal / 60);
    const secs = secondsTotal % 60;
    const displayMins = mins < 10 ? "0" + mins : mins;
    const displaySecs = secs < 10 ? "0" + secs : secs;
    return displayMins + ":" + displaySecs;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm text-sm text-gray-700 max-w-sm mx-auto">
      <audio
        ref={audioRef}
        src={currentSong.src}
        onTimeUpdate={updateTime}
        onLoadedMetadata={loadMetadata}
        onEnded={nextTrack}
      />
      
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-gray-700" />
          <span className="text-xs text-gray-500 font-bold">
            PERSONAL DJ
          </span>
        </div>
        <Music className="w-3.5 h-3.5 text-gray-400" />
      </div>

      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center bg-gray-50 relative overflow-hidden flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-gray-900 font-bold truncate text-[13px] tracking-wide">
            {currentSong.title}
          </div>
          <div className="text-gray-400 text-[10px] mt-0.5 uppercase truncate font-semibold">
            {currentSong.artist}
          </div>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        <div className="relative group">
          <input
            type="range"
            min="0"
            max={totalDuration || 100}
            value={currentTime}
            onChange={changeProgress}
            className="w-full h-1.5 bg-gray-200 rounded-lg cursor-pointer accent-gray-900 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between text-[9px] text-gray-400 font-bold uppercase tracking-wider">
          <span>{convertSecondsToTime(currentTime)}</span>
          <span>{convertSecondsToTime(totalDuration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={prevTrack}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          
          <button
            onClick={togglePlay}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-950 bg-gray-950 text-white hover:bg-gray-900 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-current text-white" />
            ) : (
              <Play className="w-4 h-4 fill-current text-white translate-x-[1px]" />
            )}
          </button>
          
          <button
            onClick={nextTrack}
            className="w-7 h-7 flex items-center justify-center rounded border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 max-w-[90px] w-full">
          <Volume2 className="w-3.5 h-3.5 text-gray-400" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg cursor-pointer accent-gray-950 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
