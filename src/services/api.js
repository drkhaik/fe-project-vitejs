import axios from "../utilizes/axiosCustomize";

const handleLogin = (email, password) => {
    return axios.post("/api/v1/login", { email, password });
}

// ======= USER ======

const fetchAllUserAPI = () => {
    return axios.get("/api/v1/user");
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

const createUser = (data) => {
    return axios.post("/api/v1/user", data);
}

const updateUserAPI = (data) => {
    return axios.put("/api/v1/user", data);
}

const changeUserPassword = (data) => {
    return axios.put(`/api/v1/user/change-password`, data);
}

const deleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}

const callUploadFileAPI = (file, public_id) => {
    const bodyFormData = new FormData();
    const publicID = public_id ? public_id : null;
    bodyFormData.append('file', file);
    bodyFormData.append('public_id', publicID);
    return axios({
        method: 'post',
        url: '/api/v1/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            // "upload-type": "book"
        },
    });
}

export {
    handleLogin,
    fetchAllUserAPI,
    createUser,
    fetchUserAccountAPI,
    handleLogout,
    fetchAllRole,
    updateUserAPI,
    changeUserPassword,
    deleteUser,
    callUploadFileAPI,
}