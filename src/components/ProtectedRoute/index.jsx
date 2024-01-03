import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const PermitAccess = ({ allowedRoles, children }) => {
    const user = useSelector(state => state.account.user);
    const userRole = user.role;
    if (allowedRoles.includes(userRole)) {
        return <>{children}</>;
    }
    return <NotPermitted />;
};

const ProtectedRoute = (props) => {
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const isStaffRoute = window.location.pathname.startsWith('/staff');

    const renderPermissions = () => {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }
        if (isAdminRoute) {
            return <PermitAccess allowedRoles={['Admin']}>{props.children}</PermitAccess>;
        }
        if (isStaffRoute) {
            return <PermitAccess allowedRoles={['Department', 'Admin']}>{props.children}</PermitAccess>;
        }
        return <PermitAccess allowedRoles={['Admin', 'Student']}>{props.children}</PermitAccess>;
    };

    return <>{renderPermissions()}</>;
};

export default ProtectedRoute;
