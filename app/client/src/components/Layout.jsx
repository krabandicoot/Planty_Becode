import { Outlet } from "react-router-dom";

export function Layout() {
    return (
        <main className="ml-8 mr-8">
            <Outlet />
        </main>
    )
} 