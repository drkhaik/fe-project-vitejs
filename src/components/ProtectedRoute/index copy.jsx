import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import NotPermitted from "./NotPermitted";

const PermitAdminAccess = (props) => {
    const user = useSelector(state => state.account.user)
    const userRole = user.role;
    if (userRole === 'Admin') {
        return (<> {props.children} </>)
    }
    return (<> <NotPermitted /> </>)
}

const PermitDepartmentStaffAccess = (props) => {
    const user = useSelector(state => state.account.user)
    const userRole = user.role;
    if (userRole === 'Staff' || userRole === 'Admin') {
        return (<> {props.children} </>)
    }
    return (<> <NotPermitted /> </>)
}

const PermitUserAccess = (props) => {
    const user = useSelector(state => state.account.user)
    const userRole = user.role;
    if (userRole === 'Admin' || userRole === 'Student') {
        return (<> {props.children} </>)
    }
    return (<> <NotPermitted /> </>)
}

const ProtectedRoute = (props) => {
    const isAdminRoute = window.location.pathname.startsWith('/admin');
    const isStaffRoute = window.location.pathname.startsWith('/staff');
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    console.log(props);
    // console.log("check authenticated", isAuthenticated);
    return (
        <>
            {isAuthenticated === true ?
                <>
                    {isAdminRoute ?
                        <>
                            <PermitAdminAccess>
                                {props.children}
                            </PermitAdminAccess>
                        </>
                        :
                        <>
                            {isStaffRoute
                                ?
                                <>
                                    <PermitDepartmentStaffAccess>
                                        {props.children}
                                    </PermitDepartmentStaffAccess>
                                </>
                                :
                                <>
                                    <PermitUserAccess>
                                        {props.children}
                                    </PermitUserAccess>
                                </>
                            }
                        </>
                    }
                </>
                :
                <Navigate to="/login" replace />
            }

        </>
    )
}

export default ProtectedRoute;