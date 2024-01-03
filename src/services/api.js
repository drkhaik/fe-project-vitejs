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

const deleteUser = (_id) => {
    return axios.delete(`/api/v1/user/${_id}`);
}

// ================ CONVERSATION ============


const createConversation = (data) => {
    return axios.post(`/api/v1/conversation`, data);
}

const fetchConversationById = (_id) => {
    return axios.get(`/api/v1/conversation/${_id}`);
}

// ================ MESSAGE ============


const fetchMessageHistoryById = (conversationId) => {
    return axios.get(`/api/v1/message/history/${conversationId}`);
}


///// ============ UPLOAD =============

const callUploadUserImgAPI = (file, public_id) => {
    const bodyFormData = new FormData();
    const publicID = public_id ? public_id : null;
    bodyFormData.append('file', file);
    bodyFormData.append('public_id', publicID);
    return axios({
        method: 'post',
        url: '/api/v1/upload/image',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            // "upload-type": "book"
        },
    });
}

const callUploadMessageFileAPI = (file) => {
    const bodyFormData = new FormData();
    bodyFormData.append('file', file);
    return axios({
        method: 'post',
        url: '/api/v1/upload/file',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            // "upload-type": "book"
        },
    });
}

const getAllRole = () => {
    return axios.get(`/api/v1/role`);
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
    callUploadUserImgAPI,
    callUploadMessageFileAPI,
    fetchConversationById,
    createConversation,
    fetchMessageHistoryById,
    getAllRole,
}