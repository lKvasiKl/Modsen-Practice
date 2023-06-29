import AuthProvider from "providers/AuthProvider";

import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";

import MainPage from "./pages/MainPage";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <MainPage />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
