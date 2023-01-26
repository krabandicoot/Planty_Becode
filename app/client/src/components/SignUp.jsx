import React, {useState} from "react";

export function SignUp() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });    
        setUsername("");
        setEmail("");
        setPassword("");
    }
    return (
        <div className='signup__container'>
        <h2>Sign up</h2>
        <form method="POST" className='signup__form' onSubmit={handleSubmit}>
            <label htmlFor='username'>Username</label>
            <input
                type='text'
                id='username'
                name='username'
                value={username}
                required
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                name='email'
                id='email'
                value={email}
                required
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input
                type='password'
                name='password'
                id='password'
                minLength={8}
                required
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor='password'>Password verification</label>
            <input
                type='password'
                name='passwordVerification'
                id='passwordVerification'
                minLength={8}
                required
                value={password}
                placeholder="Enter Again Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='signupBtn'>Sign Up</button>
        </form>
    </div>
    )
}
