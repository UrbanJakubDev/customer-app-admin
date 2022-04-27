import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../hooks/useAuth'
import Head from 'next/head'

const Login = (props) => {
    const router = useRouter()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginErros, setLoginErros] = useState('')

    const submitForm = async (e) => {
        e.preventDefault()

        try {
            login({ email, password })
            props.onLoginSubmit()
        } catch (err) {
            // return error to parent using callback functional
            setLoginErros(err.errors)
        }
    }

    return (
        <>
            <Head>
                <title>Login | Plyn Admin</title>
            </Head>
            <div className="login-wrapper">
                <div className="login-form">
                    <span className="title">Vítejtejte,</span>
                    <span className="secondary">přihlašte se</span>
                    <form onSubmit={submitForm}>
                        <div className="input-group">
                            <label className="input-label">Email</label>
                            <input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <input
                                placeholder="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn-login" type="submit">
                            Login
                        </button>
                    </form>
                    {loginErros}
                </div>
            </div>
        </>
    )
}

export default Login
