import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './webpages/Login/Login';
import Main from './webpages/Main/Main';
import { ProtectedRoute } from './components/protectedRoute';
import UpdateTransaction from './webpages/UpdateTransaction/UpdateTransaction';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/main" element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route exact path="/update-transaction/:id" element={<ProtectedRoute><UpdateTransaction/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
