import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider.js";
import useRole from "../../hooks/useRole.js";
import Loading from "../../pages/Shared/Loading/Loading.js";

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const [role, roleLoading] = useRole(user?.email);
	const location = useLocation();

	if (loading || roleLoading) {
		return <Loading></Loading>;
	}

	if (user && role === "admin") {
		return children;
	}

	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
