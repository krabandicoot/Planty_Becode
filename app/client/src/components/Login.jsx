export function Login() {
    return (
        <form method="post">
            <label for="username"></label>
            <input type="text" placeholder="Enter Username" name="username" required />

            <label for="password"></label>
            <input type="text" placeholder="Enter Password" name="password" required />

            <button type="submit">Login</button>

            <label>
                <input type="checkbox" checked="checked" name="rememberMe" />
            </label>
        </form>
    )
}