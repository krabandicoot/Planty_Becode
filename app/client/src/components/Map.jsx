import useAuth from "../hooks/useAuth";

export function Map() {
    const { setAuth } = useAuth();
    return (
        <h1>Hello user</h1>
    )
}