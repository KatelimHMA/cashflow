import "./login.css";
import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";


function Login() {

    // State variables to store login data
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Event Handler to handle button click
    function handleLogin () {
        console.log("Botão clicado");
        
        // Check credencials (fixed user and password)
        if (username !== 'admin' || password !== '1234') {
            alert('Credenciais inválidas. Tente novamente.');
            return;
        }

        // Fake token
        const userToken = 'my-fake-token';

        // Save token in localStorage
        localStorage.setItem('token', userToken);

        // Redirecionar para a página principal
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
                        onChange={(e) => setUsername(e.target.value)}
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="button" onClick={handleLogin}>
                    Entrar
                </button>
            </form>
        </div>
    )
}

export default Login;


