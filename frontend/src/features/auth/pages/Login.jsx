import React, { useState } from 'react'
import "../style/login.scss";
import FormGroup from "../components/FormGroup"
import { Link } from "react-router";
import { useAuth } from '../hooks/userAuth';
import { useNavigate } from 'react-router';

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate("/")

    }

    return (
        <div>
            <main className="login-page">
                <div className='form-container'>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit}>
                        <FormGroup
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                        />

                        <FormGroup
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                        />

                        <button className="button" type="submit">Login</button>
                    </form>
                    <p>Don't have an account <Link to="/register">Register Here</Link></p>
                </div>
            </main>
        </div>
    )
}

export default Login
