import { NavLink, Outlet } from "react-router";

const AppLayout = () => {
    return (
        <div>
            <h1>App Layout</h1>
            <nav>
                {/* NavLink makes it easy to show active states */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>
                <NavLink
                    to="/chat"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Chat
                </NavLink>
                <NavLink
                    to="/files"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    Files
                </NavLink>
            </nav>
            <Outlet />
        </div>
    );
}

export default AppLayout;