import { useNavigate } from "react-router-dom"
import { Container } from "../styled-components/Container";
import { Button } from "@mui/material";
function NotFoundPage() {
    const navigate = useNavigate();
  return (
      <Container>
        <h1>404 Not Found</h1>
        <Button onClick={() => navigate("/")} variant="contained" >Go Back to Home</Button>
    </Container>
  )
}

export default NotFoundPage