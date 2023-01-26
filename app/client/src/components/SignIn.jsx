import { useState } from "react";
import axios from "axios";

export function SignIn() {


    // fetch data from API
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



    // Remember me Checkbox


    return (
        <div className="form__container">
            <form method="post">
                <div className="form__username">
                    <label>Username</label>
                    <input type="text" placeholder="Enter Username" name="username" id="username" required />

                </div>

                <div className="form__password">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Password" name="password" required />

                </div>

                <button type="submit">Login</button>

                <input type="checkbox" checked="checked" name="rememberMe" id="rememberMe" />
                <label>Remember me</label>
            </form>
        </div>
    )
}