import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import NeuralCanvas from './components/NeuralCanvas';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Skills from './pages/Skills';
import Build from './pages/Build';
import Registry from './pages/Registry';
import Aapps from './pages/Aapps';
import Learn from './pages/Learn';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NeuralCanvas />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/build" element={<Build />} />
        <Route path="/registry" element={<Registry />} />
        <Route path="/aapps" element={<Aapps />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
