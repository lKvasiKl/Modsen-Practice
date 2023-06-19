import AuthProvider from "providers/AuthProvider";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <AuthProvider>
      <MainPage />
    </AuthProvider>
  );
}

export default App;
