import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  togglePlay,
  nextSong,
  prevSong,
  setCurrentTime,
  setDuration,
  setVolume,
  clearPlayer,
} from '../features/player/playerSlice';
import {
  FaPlay,
  FaPause,
  FaStepForward,
  FaStepBackward,
  FaVolumeUp,
  FaChevronDown,
  FaChevronUp,
  FaTimes,
} from 'react-icons/fa';
import type { RootState } from '../store/store';
import {
  AlbumArt,
  ControlButton,
  Controls,
  PlayerContainer,
  PlayerInfo,
  ProgressBar,
  ProgressContainer,
  SongInfo,
  TimeInfo,
  VolumeControl,
  VolumeSlider,
  TopBar,
} from '../styled-components/Player';

const MusicPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { currentSong, isPlaying, currentTime, duration, volume } = useSelector(
    (state: RootState) => state.player
  );

  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying
      ? audioRef.current.play().catch(() => dispatch(togglePlay()))
      : audioRef.current.pause();
  }, [isPlaying, currentSong, dispatch]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const closePlayer = () => {
    if (currentSong && isVisible) {
      setIsVisible(false);
      dispatch(clearPlayer());
    }
    setIsVisible(true);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * duration;
    audioRef.current.currentTime = newTime;
    dispatch(setCurrentTime(newTime));
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong)return null;

  return (
    isVisible && (
      <>
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onTimeUpdate={() =>
            dispatch(setCurrentTime(audioRef.current!.currentTime))
          }
          onLoadedMetadata={() =>
            dispatch(setDuration(audioRef.current!.duration))
          }
          onEnded={() => dispatch(nextSong())}
        />
        <PlayerContainer minimized={isMinimized}>
          <TopBar>
            <span>
              {currentSong.title} — {currentSong.artist}
            </span>
            <div>
              <ControlButton onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <FaChevronUp /> : <FaChevronDown />}
              </ControlButton>
              <ControlButton onClick={closePlayer}>
                <FaTimes />
              </ControlButton>
            </div>
          </TopBar>

          {!isMinimized && (
            <>
              <PlayerInfo>
                <AlbumArt
                  src={currentSong.coverImageUrl || '/default-album.jpg'}
                  alt={currentSong.title}
                />
                <SongInfo>
                  <h4>{currentSong.title}</h4>
                  <p>{currentSong.artist}</p>
                </SongInfo>
              </PlayerInfo>

              <ProgressContainer onClick={handleProgressClick}>
                <ProgressBar progress={(currentTime / duration) * 100} />
              </ProgressContainer>

              <TimeInfo>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </TimeInfo>

              <Controls>
                <ControlButton onClick={() => dispatch(prevSong())}>
                  <FaStepBackward />
                </ControlButton>
                <ControlButton onClick={() => dispatch(togglePlay())}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </ControlButton>
                <ControlButton onClick={() => dispatch(nextSong())}>
                  <FaStepForward />
                </ControlButton>
                <VolumeControl>
                  <FaVolumeUp />
                  <VolumeSlider
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) =>
                      dispatch(setVolume(parseFloat(e.target.value)))
                    }
                  />
                </VolumeControl>
              </Controls>
            </>
          )}
        </PlayerContainer>
      </>
    )
  );
};

export default MusicPlayer;
