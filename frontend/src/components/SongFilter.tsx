import React from 'react';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { ETHIOPIAN_GENRES, type SongFilterProps } from '../types/song';
import { Filters } from '../styled-components/SongList';



const SongFilter: React.FC<SongFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <Filters>
      <TextField
        label="Title"
        name="title"
        value={filters.title}
        onChange={onFilterChange}
        variant="outlined"
        size="small"
      />
      <TextField
        label="Artist"
        name="artist"
        value={filters.artist}
        onChange={onFilterChange}
        variant="outlined"
        size="small"
      />
      <TextField
        label="Album"
        name="album"
        value={filters.album}
        onChange={onFilterChange}
        variant="outlined"
        size="small"
      />
      <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
        <InputLabel id="genre-select-label">Genre</InputLabel>
        <Select
          labelId="genre-select-label"
          name="genre"
          value={filters.genre}
          onChange={onFilterChange}
          label="Genre"
        >
          <MenuItem value="">All Genres</MenuItem>
          {ETHIOPIAN_GENRES.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Filters>
  );
};

export default SongFilter;
