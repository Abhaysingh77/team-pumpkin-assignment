import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthForm from './pages/AuthForm.jsx'
import ChatPage from "./pages/ChatPage.jsx";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
