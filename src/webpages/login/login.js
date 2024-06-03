import "./login.css";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function Login() {

    // State variables to store login data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Event Handler to handle button click
    function handleLogin () {
        
        // Check credencials (fixed user and password)
        if (username !== 'admin' || password !== '1234') {
            setError('Credenciais inválidas. Tente novamente.');
            return;
        }

        // Fake token
        const userToken = 'my-fake-token';

        // Save token in localStorage
        localStorage.setItem('token', userToken);

        // Redirects to the main page
        navigate('/main');
    }

    return(      
        <div className="Login-container">
            <header className="Login-header">
                <span>Entre na sua conta</span>
            </header>

            <form>
                <div className="Login-input">
                    <label htmlFor="username"> Utilizador</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError('');
                        }}
                        aria-label="Digite o username"
                        required
                    />
                </div>

                <div className="Login-input">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        aria-label="Digite a senha"
                        required
                    />
                </div>

                <button type="button" onClick={handleLogin}>
                    Entrar
                </button>
            </form>

            {/* It only shows the error message if error were not empty. */}
			{error && <div className="error-message">{error}</div>}	

        </div>
    )
}

export default Login;


