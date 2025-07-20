import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <MainContent />
      <UserProfile name="Omnia Elnaggar" age={21} bio="Front-End Developer with a creative mind and a love for learning.." />
      <Footer />
    </div>
  );
}

export default App;
