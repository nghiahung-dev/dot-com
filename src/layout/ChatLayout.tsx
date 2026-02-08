import { NavLink, Outlet } from "react-router";
import useDocumentTitle from "../hooks/useDocumentTitle";

const ChatLayout = () => {
    useDocumentTitle("Chat Layout");
    return (
        <div>
            <h1>Chat Layout</h1>
            <NavLink
                to="/chat/1"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                Chat 1
            </NavLink>
            <NavLink
                to="/chat/2"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                Chat 2
            </NavLink>
            <NavLink
                to="/chat/3"
                className={({ isActive }) =>
                    isActive ? "active" : ""
                }
            >
                Chat 3
            </NavLink>
            <Outlet />
        </div>
    );
}

export default ChatLayout;