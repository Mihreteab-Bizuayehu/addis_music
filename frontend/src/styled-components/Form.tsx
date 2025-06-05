import styled from '@emotion/styled';
import {
  Typography,
} from '@mui/material';


export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  @media (min-width: 800px) {
    width: 90%;
  }
  @media (min-width: 1000px) {
    width: 60%;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FileInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ErrorText = styled(Typography)`
  color: #d32f2f;
  font-size: 0.75rem;
  margin-top: 0.25rem;
`;

export const ErrorMessage = styled.div`
  color: #d9534f;
  background-color: #f2dede;
  border: 1px solid #ebccd1;
  padding: 10px 15px;
  border-radius: 4px;
  margin-top: 15px;
  text-align: center;
`;

