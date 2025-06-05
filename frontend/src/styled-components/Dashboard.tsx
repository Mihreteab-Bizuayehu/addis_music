import styled from '@emotion/styled';
import { Card, Typography } from '@mui/material';

export const PageContainer = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StatCard = styled(Card)`
  width: 100%;
  display: flex;
  padding: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const StatTitle = styled(Typography)`
  font-size: 1rem;
  color: #666;
  margin-bottom: 0.25rem;
`;

export const StatValue = styled(Typography)`
  font-size: 2rem;
  font-weight: 600;
`;

export const ChartContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-top: 1rem;

  @media (max-width: 600px) {
    height: 250px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
