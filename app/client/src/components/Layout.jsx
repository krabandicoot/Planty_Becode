import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <main className="App max-h-screen max-w-screen m-8">
            <Outlet />
        </main >
    )
}