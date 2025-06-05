import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ETHIOPIAN_GENRES } from '../types/song';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from '@mui/material';
import { songFormSchema, type SongFormValues } from '../utils/validator';
import {
  ErrorText,
  FileInput,
  FormContainer,
  StyledForm,
} from '../styled-components/Form';

interface SongFormProps {
  onSubmit: (data: FormData) => void;
  initialValues?: SongFormValues;
  isLoading: boolean;
}

const SongForm: React.FC<SongFormProps> = ({
  onSubmit,
  initialValues,
  isLoading,
}) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<SongFormValues>({
    resolver: zodResolver(songFormSchema),
    defaultValues: initialValues || {
      title: '',
      artist: '',
      album: '',
      genre: ETHIOPIAN_GENRES[0],
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const handleFormSubmit = (data: SongFormValues) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('artist', data.artist);
    formData.append('album', data.album);
    formData.append('genre', data.genre);

    if (data.audioFile) {
      formData.append('audioFile', data.audioFile);
    }

    if (data.imageFile) {
      formData.append('imageFile', data.imageFile);
    }

    onSubmit(formData);
  };

  const handleFileChange =
    (field: 'audioFile' | 'imageFile') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        setValue(field, e.target.files[0]);
      }
    };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography align="center" variant="h5" component="h2" gutterBottom>
          {initialValues ? 'Edit Song' : 'Add New Song'}
        </Typography>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          {...register('title')}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          label="Artist"
          variant="outlined"
          fullWidth
          {...register('artist')}
          error={!!errors.artist}
          helperText={errors.artist?.message}
        />

        <TextField
          label="Album"
          variant="outlined"
          fullWidth
          {...register('album')}
          error={!!errors.album}
          helperText={errors.album?.message}
        />

        <FormControl fullWidth error={!!errors.genre}>
          <InputLabel>Genre</InputLabel>
          <Select
            label="Genre"
            {...register('genre')}
            defaultValue={initialValues?.genre || ETHIOPIAN_GENRES[0]}
          >
            {ETHIOPIAN_GENRES.map((genre) => (
              <MenuItem key={genre} value={genre}>
                {genre}
              </MenuItem>
            ))}
          </Select>
          {errors.genre && <ErrorText>{errors.genre.message}</ErrorText>}
        </FormControl>

        <FileInput>
          <Typography variant="body1">Audio File</Typography>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange('audioFile')}
          />
          {errors.audioFile && (
            <ErrorText>{errors.audioFile.message}</ErrorText>
          )}
          {initialValues?.audioFile && !watch('audioFile') && (
            <Typography variant="caption">
              Current audio file will be kept
            </Typography>
          )}
        </FileInput>

        <FileInput>
          <Typography variant="body1">Cover Image</Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange('imageFile')}
          />
          {errors.imageFile && (
            <ErrorText>{errors.imageFile.message}</ErrorText>
          )}
          {initialValues?.imageFile && !watch('imageFile') && (
            <Typography variant="caption">
              Current image will be kept
            </Typography>
          )}
        </FileInput>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading
            ? 'Processing...'
            : initialValues
            ? 'Update Song'
            : 'Add Song'}
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default SongForm;
