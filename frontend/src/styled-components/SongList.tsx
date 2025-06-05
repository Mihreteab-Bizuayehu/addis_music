import styled from '@emotion/styled';
import { Card, CardMedia } from '@mui/material';


export const PageContainer = styled.div`
  padding: 2rem ;
`;

export const Header = styled.div`
  display: flex;
  margin: 0 3rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  @media ( max-width: 540px) {
    display:flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const Filters = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  @media (max-width: 540px) {
    display:flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const SongCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const SongMedia = styled(CardMedia)`
  height: 140px;
`;

export const SongActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  padding: 0.5rem;
`;

export const GridItem = styled.div`
  box-sizing: border-box;
  width: 99%;

  @media (min-width: 600px) {
    width: 48%;
  }

  @media (min-width: 900px) {
    width: 23%;
  }
`;

export const Stats = styled.div`
  box-sizing: border-box;
  width: 99%;
  @media (min-width: 900px) {
    width: 48%;
  }
  `;

  export const StatsCard = styled.div`
    box-sizing: border-box;
    width: 99%;
  
    @media (min-width: 600px) {
      width: 48%;
    }

  
    @media (min-width: 900px) {
      width: 33%;
    }
    @media (min-width: 1200px) {
      width: 23%;
    }
  `;