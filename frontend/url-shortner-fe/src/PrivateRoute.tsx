import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/contextApi";

export default function PrivateRoute({ children, publicPage}: { children: React.ReactNode, publicPage: boolean }) {
    const { token } = useStoreContext();

    if (publicPage) {
        return token ? <Navigate to="/dashboard" /> : children;
    }

    return !token ? <Navigate to="/login" /> : children;
}