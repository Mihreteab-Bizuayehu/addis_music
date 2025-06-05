import { lazy} from 'react';
import { Routes, Route } from 'react-router-dom';
import { Main, Container } from './styled-components/Container';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';


const Home = lazy(() => import('./pages/HomePage'));
const FormPage = lazy(() => import('./pages/FormPage'));
const Dashboard = lazy(() => import('./pages/DashboardPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <Container>
      <Navbar />
      <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/songs/new" element={<FormPage />} />
              <Route path="/songs/edit/:id" element={<FormPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
      </Main>
      <MusicPlayer />
      <Footer />
    </Container>
  );
}

export default App;
