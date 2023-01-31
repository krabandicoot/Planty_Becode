import { useState } from "react"
export function User() {

    const [users, setUsers] = useState();

    return (
        <div>
            <h1>Hello user</h1>
            <p>This is your page</p>
        </div>
    )
}