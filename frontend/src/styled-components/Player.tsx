import styled from '@emotion/styled';

export const PlayerContainer = styled.div<{ minimized?: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #1e1e1e;
  color: white;
  padding: ${({ minimized }) => (minimized ? '0.5rem 1rem' : '1rem')};
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
  border-top: 1px solid #333;

  @media (max-width: 600px) {
    padding: ${({ minimized }) => (minimized ? '0.3rem 0.8rem' : '0.8rem')};
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  align-items: center;

  button {
    margin-left: 0.5rem;
  }
`;

export const PlayerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AlbumArt = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;

  @media (max-width: 600px) {
    width: 50px;
    height: 50px;
  }
`;

export const SongInfo = styled.div`
  flex: 1;

  h4 {
    margin: 0;
    font-size: 1rem;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    color: #b3b3b3;
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

export const ControlButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #1db954;
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background: #535353;
  border-radius: 2px;
  cursor: pointer;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: ${(props) => props.progress}%;
  height: 100%;
  background: #1db954;
  border-radius: 2px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: -5px;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: white;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover::after {
    opacity: 1;
  }
`;

export const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #b3b3b3;
`;

export const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 120px;
`;

export const VolumeSlider = styled.input`
  flex: 1;
`;
