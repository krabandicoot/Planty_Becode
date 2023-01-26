import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


export function SignIn(setLoginUser) {
    const navigateTo = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = e => {
        const { username, value } = e.target
        setUser({
            ...user,
            [username]: value
        })
    }

    // fetch data from API
    const login = () => {
        axios.post("http://localhost:8080/api/user/signin", user)
            .then(res => {
                alert(res.data.message)
                setLoginUser(res.data.user)
                navigateTo("/map")
            })
    }

    // TODO Remember me Checkbox

    return (
        <div className="form__container">
            <form method="post" autoComplete="off">
                <div className="form__username">
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        name="username" id="username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form__password">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />

                </div>

                <button
                    type="submit"
                    onClick={login}>Login</button>

                <input
                    type="checkbox"
                    checked="checked"
                    name="rememberMe"
                    id="rememberMe"
                />
                <label>Remember me</label>
            </form>
            <div className="flex items-center justify-center mt-6">
                <a href="signup" onClick={navigateTo("/map")}>
                    <span className="ml-2">
                        You don't have an account?
                    </span>
                </a>
            </div>
        </div>
    )
}