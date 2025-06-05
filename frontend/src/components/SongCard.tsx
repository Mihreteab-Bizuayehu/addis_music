import React from 'react';
import {
  CardContent,
  Typography,
  IconButton
} from '@mui/material';
import { PlayArrow, Edit, Delete } from '@mui/icons-material';
import { type Song } from '../types/song';
import {
  SongCard,
  SongMedia,
  SongActions,
  GridItem,
} from '../styled-components/SongList';

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
  onEdit: (song: Song) => void;
  onDelete: (id: string) => void;
}

const SongCardComponent: React.FC<SongCardProps> = ({
  song,
  onPlay,
  onEdit,
  onDelete,
}) => {
  return (
    <GridItem>
      <SongCard>
        <SongMedia
          image={song.coverImageUrl || '/default-album.jpg'}
          title={song.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h3">
            {song.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {song.artist}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {song.album} • {song.genre}
          </Typography>
        </CardContent>

        <SongActions>
          <IconButton
            onClick={() => onPlay(song)}
            aria-label={`Play ${song.title}`}
            color="success"
          >
            <PlayArrow/>
          </IconButton>
          <div>
            <IconButton
              onClick={() => onEdit(song)}
              aria-label={`Edit ${song.title}`}
              color="secondary"
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => onDelete(song._id)}
              aria-label={`Delete ${song.title}`}
              color="error"
            >
              <Delete />
            </IconButton>
          </div>
        </SongActions>
      </SongCard>
    </GridItem>
  );
};

export default SongCardComponent; 
