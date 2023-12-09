import axios from "../utilizes/axiosCustomize";

const handleLogin = (email, password) => {
    return axios.post("/api/v1/login", { email, password });
}

// ======= USER ======

const fetchAllUserAPI = () => {
    return axios.get("/api/v1/user");
}

const createUser = (fullName, email, password) => {
    return axios.post("/api/v1/user", { fullName, email, password });
}

const fetchUserAccountAPI = () => {
    return axios.get("/api/v1/fetch-account");
}

const handleLogout = () => {
    return axios.post("/api/v1/logout");
}

const fetchAllRole = () => {
    return axios.get("/api/v1/role");
}

const updateUserAPI = (data) => {
    return axios.put("/api/v1/user", data);
}

// ======= DEPARTMENT ======

const createDepartment = (data) => {
    return axios.post("/api/v1/department", data);
}

const fetchAllDepartment = () => {
    return axios.get("/api/v1/department");
}

const updateDepartmentInfo = (data) => {
    return axios.put(`/api/v1/department/`, data);
}

const changeDepartmentPassword = (data) => {
    return axios.put(`/api/v1/department/change-password`, data);
}

const deleteDepartment = (id) => {
    return axios.delete(`/api/v1/department/${id}`);
}

export {
    handleLogin,
    fetchAllUserAPI,
    createUser,
    fetchUserAccountAPI,
    handleLogout,
    fetchAllRole,
    updateUserAPI,
    createDepartment,
    fetchAllDepartment,
    updateDepartmentInfo,
    changeDepartmentPassword,
    deleteDepartment,
}