import { Box, CircularProgress } from "@mui/material";
import { PageContainer } from "../styled-components/SongList";

const LoadingSpinner: React.FC = () => (
  <PageContainer>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="200px"
          >
            <CircularProgress />
          </Box>
  </PageContainer>
);

export default LoadingSpinner;
