import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAuth, loading }) => {

    if (!loading && !isAuth) {
        return <Navigate to="/" replace />;
    }

    return loading ? null : (
        children
    );
};

export default ProtectedRoute;
