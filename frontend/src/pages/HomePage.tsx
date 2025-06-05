import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSongsRequest,
  selectSong,
  deleteSongRequest,
  resetFormSubmissionFlags,
} from '../features/song/songSlice';
import { Button, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

import { playSong } from '../features/player/playerSlice';
import type { RootState } from '../store/store';
import { type InputChangeEvent, type Song } from '../types/song';
import {
  Header,
  PageContainer,
} from '../styled-components/SongList';
import SongCardComponent from '../components/SongCard';
import SongFilter from '../components/SongFilter';
import { Container, Pages, SongContainer } from '../styled-components/Container';
import LoadingSpinner from '../components/LoadingSpinner';



const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { songs, loading, error, pagination, isCreateSuccessful, isUpdateSuccessful, isDeleteSuccessful } = useSelector(
    (state: RootState) => state.song
  );
  const [filters, setFilters] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    page: 1,
    limit: 10, 
  });

  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
  }, [filters]);

  useEffect(() => {
    dispatch(fetchSongsRequest(filters));
    if (isCreateSuccessful || isUpdateSuccessful || isDeleteSuccessful) {
      dispatch(resetFormSubmissionFlags());
    }
  }, [
    filters,
    isCreateSuccessful,
    isUpdateSuccessful,
    isDeleteSuccessful,
    dispatch,
  ]);

  const handleFilterChange = (e: InputChangeEvent) => {
    const target = e.target as
      | HTMLInputElement
      | { name: string; value: string };
    const { name, value } = target;
    if (name) {
      setFilters((prev) => ({
        ...prev,
        [name]: value as string,
        page: 1,
      }));
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handlePlaySong = (song: Song) => {
      dispatch(playSong({ song, queue: songs }));
    }

  const handleEditSong = (song: Song) => {
      dispatch(selectSong(song));
      navigate(`/songs/edit/${song._id}`);
    }

  const handleDeleteSong = (id: string) => {
      if (window.confirm('Are you sure you want to delete this song?')) {
        dispatch(deleteSongRequest(id));
      }
    }

  const totalPages = pagination?.pages && pagination.pages > 0 ? pagination.pages : 0;
  
  if (loading) {
    return (
      <Container>
          <LoadingSpinner />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );   
  }

  return (
    <PageContainer>
      <Header>
        <Typography variant="h5">Music Library</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          component={Link}
          to="/songs/new"
        >
          Add Song
        </Button>
      </Header>

      <SongFilter filters={filters} onFilterChange={handleFilterChange} />

      {!loading && !error && songs?.length === 0 && (
        <Container>
          <Typography variant="h6" align="center" sx={{ marginTop: 4 }}>
            No songs found.
          </Typography>
        </Container>
      )}

      {songs && songs.length > 0 && (
        <SongContainer>
          {songs.map((song: Song) => (
            <SongCardComponent
              key={song._id}
              song={song}
              onPlay={handlePlaySong}
              onEdit={handleEditSong}
              onDelete={handleDeleteSong}
            />
          ))}
        </SongContainer>
      )}

      {totalPages > 1 && (
        <Pages>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === pagination.page ? 'contained' : 'outlined'}
              onClick={() => handlePageChange(page)}
              style={{ margin: '0 0.25rem' }}
            >
              {page}
            </Button>
          ))}
        </Pages>
      )}
    </PageContainer>
  );
};

export default HomePage;
