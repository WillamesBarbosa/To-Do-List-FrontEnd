import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { CreateUserRequest, CreateUserResponse } from "../../types/user";

function Register(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault()

        try {
            await api.post<CreateUserResponse>('/user', {name, email, password} as CreateUserRequest)
            navigate('/')
        } catch (err) {
            console.log(err)
            setError('Erro ao criar conta. Verifique os dados.')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="name"></input>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="email"></input>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="password"></input>
            <button type="submit">Criar Conta</button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Register