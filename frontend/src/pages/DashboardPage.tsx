import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatisticsRequest } from '../features/dashboard/dashboardSlice';
import {
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';
import type { RootState } from '../store/store';
import type { Song } from '../types/song';
import {
  PageContainer,
  StatTitle,
  StatValue,
} from '../styled-components/Dashboard';
import { SongContainer } from '../styled-components/Container';
import { useNavigate } from 'react-router-dom';
import SongCardComponent from '../components/SongCard';
import { deleteSongRequest, selectSong } from '../features/song/songSlice';
import { playSong } from '../features/player/playerSlice';
import { SongCard, Stats, StatsCard } from '../styled-components/SongList';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  
  const dispatch = useDispatch();
  const { statistics, loading, error } = useSelector(
    (state: RootState) => state?.dashboard
  );

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchStatisticsRequest());
  }, [dispatch]);

  const handlePlaySong = (song: Song) => {
    dispatch(playSong({ song, queue: statistics?.latestSongs }));
  };

  const handleEditSong = (song: Song) => {
    dispatch(selectSong(song));
    navigate(`/songs/edit/${song._id}`);
  };

  const handleDeleteSong = (id: string) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      dispatch(deleteSongRequest(id));
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <LoadingSpinner />
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <Typography color="error">{error}</Typography>
      </PageContainer>
    );
  }

  if (!statistics) {
    return (
      <PageContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Typography
          variant="h6"
          gutterBottom
          style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.6)' }}
        >
          No statistics available
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Typography variant="h4" gutterBottom>
        Music Dashboard
      </Typography>

      {statistics?.totals && (
        <SongContainer>
          <StatsCard>
            <SongCard>
              <CardContent style={{ textAlign: 'center' }}>
                <StatTitle>Total Songs</StatTitle>
                <StatValue>{statistics.totals.songs}</StatValue>
              </CardContent>
            </SongCard>
          </StatsCard>

          <StatsCard>
            <SongCard>
              <CardContent style={{ textAlign: 'center' }}>
                <StatTitle>Total Artists</StatTitle>
                <StatValue>{statistics.totals.artists}</StatValue>
              </CardContent>
            </SongCard>
          </StatsCard>

          <StatsCard>
            <SongCard>
              <CardContent style={{ textAlign: 'center' }}>
                <StatTitle>Total Albums</StatTitle>
                <StatValue>{statistics.totals.albums}</StatValue>
              </CardContent>
            </SongCard>
          </StatsCard>

          <StatsCard>
            <SongCard>
              <CardContent style={{ textAlign: 'center' }}>
                <StatTitle>Total Genres</StatTitle>
                <StatValue>{statistics.totals.genres}</StatValue>
              </CardContent>
            </SongCard>
          </StatsCard>
        </SongContainer>
      )}

      <SongContainer>
        <Stats>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Songs by Genre
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="Album statistics">
                <TableHead>
                  <TableRow>
                    <TableCell >Genre</TableCell>
                    <TableCell align="right">Songs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statistics.songsPerGenre.map((genre) => (
                    <TableRow
                      key={genre.genre}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {genre.genre}
                      </TableCell>
                      <TableCell align="right">{genre.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Stats>

        <Stats>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Artists Statistics
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="Album statistics">
                <TableHead>
                  <TableRow>
                    <TableCell>Artist</TableCell>
                    <TableCell align="right">Albums</TableCell>
                    <TableCell align="right">Songs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statistics.artistStats.map((artist) => (
                    <TableRow
                      key={artist.artist}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {artist.artist}
                      </TableCell>
                      <TableCell align="right">{artist.albumsCount}</TableCell>
                      <TableCell align="right">{artist.songs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Stats>

        <Stats>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Album Statistics
            </Typography>
            <TableContainer component={Paper}>
              <Table aria-label="Album statistics">
                <TableHead>
                  <TableRow>
                    <TableCell>Album</TableCell>
                    <TableCell align="right">Artist</TableCell>
                    <TableCell align="right">Songs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {statistics.albumStats.map((album) => (
                    <TableRow
                      key={album.album}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {album.album}
                      </TableCell>
                      <TableCell align="right">{album.artist}</TableCell>
                      <TableCell align="right">{album.songs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Stats>
      </SongContainer>

      <Typography variant="h6" gutterBottom>
        Latest Added Songs
      </Typography>
      {statistics.latestSongs.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No songs added yet
        </Typography>
      ) : (
        <SongContainer>
          {statistics.latestSongs.map((song: Song) => (
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
    </PageContainer>
  );
};

export default DashboardPage;
