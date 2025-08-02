import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main style={{ padding: '20px' }}>
      <UserProfile name="Omnia" age={21} bio="Ambitious Front-End Developer from Egypt." />
    </main>
  );
}

export default MainContent;
