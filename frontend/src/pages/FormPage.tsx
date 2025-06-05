import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import SongForm from '../components/SongForm';
import styled from '@emotion/styled';
import {
  clearSelectedSong,
  createSongRequest,
  fetchSongByIdRequest,
  resetFormSubmissionFlags,
  updateSongRequest,
} from '../features/song/songSlice';
import { ETHIOPIAN_GENRES, type Song } from '../types/song';
import type { SongFormValues } from '../utils/validator';
import { ErrorMessage } from '../styled-components/Form';

const PageContainer = styled.div`
  padding: 2rem;
`;

const mapSelectedSongToFormValues = (song: Song): SongFormValues => {
  const genre = ETHIOPIAN_GENRES.includes(
    song.genre as (typeof ETHIOPIAN_GENRES)[number]
  )
    ? (song.genre as SongFormValues['genre'])
    : 'Other';

  return {
    title: song.title,
    artist: song.artist,
    album: song.album,
    genre,
    audioFile: undefined,
    imageFile: undefined,
  };
};

const FormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const {
    selectedSong,
    loading,
    error,
    isCreateSuccessful,
    isUpdateSuccessful,
  } = useSelector((state: RootState) => state.song);

  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode && id) {
      if (!selectedSong || selectedSong._id !== id) {
        dispatch(fetchSongByIdRequest(id));
       }
    }
  }, [dispatch, isEditMode, id, selectedSong]);

  useEffect(() => {
    if (isCreateSuccessful || isUpdateSuccessful) {
      navigate('/');
      dispatch(resetFormSubmissionFlags());
    }
  }, [isCreateSuccessful, isUpdateSuccessful]);
  
  const handleSubmit = (formData: FormData) => {
    if (isEditMode && id) {
      dispatch(updateSongRequest({ id, formData }));
    } else {
      dispatch(createSongRequest(formData));
    }

    dispatch(clearSelectedSong());
  };

  const initialValues =
    isEditMode && selectedSong
      ? mapSelectedSongToFormValues(selectedSong)
      : undefined;
  
      if (isEditMode && loading && !selectedSong) {
        return (
          <PageContainer>
            <div>Loading song data...</div>
          </PageContainer>
        );
      }

      if (isEditMode && !loading && !selectedSong && error) {
        return (
          <PageContainer>
            <ErrorMessage>
              Error fetching song: {error}. Please try again or check the song
              ID.
            </ErrorMessage>
          </PageContainer>
        );
      }

  return (
    <PageContainer>
      <SongForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        isLoading={loading}
      />
      {error && <div>{error}</div>}
    </PageContainer>
  );
};

export default FormPage;
