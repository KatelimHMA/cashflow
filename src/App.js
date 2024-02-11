import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './webpages/login/login';
import Main from './webpages/main/main';
import { ProtectedRoute } from './components/protectedRoute';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
