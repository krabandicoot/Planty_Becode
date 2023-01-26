import { useState } from "react";

export function SignIn() {

    async function loginUser(credentials) {
        return fetch('localhost:8080/api/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    return (
        <div className="form__container">
            <form method="post">
                <div className="form__username">
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" name="username" required />

                </div>

                <div className="form__password">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" name="password" required />

                </div>

                <button type="submit">Login</button>

                <label>
                    <input type="checkbox" checked="checked" name="rememberMe" />
                </label>
            </form>
        </div>
    )
}