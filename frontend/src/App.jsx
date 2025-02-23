import AuthForm from "./pages/AuthForm.jsx";
import ChatPage from "./pages/ChatPage.jsx";
function App() {
  const loggedInUserId = localStorage.getItem("userId");

  return <>{loggedInUserId ? <ChatPage /> : <AuthForm />}</>;
}

export default App;
