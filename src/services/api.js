import axios from "../utilizes/axiosCustomize";

// ======= ACCOUNT =============

const handleLogin = (email, password) => {
    return axios.post("/api/v1/login", { email, password });
}

const handleGoogleLogin = (data) => {
    return axios.post("/api/v1/google-login", data);
}

const handleLogout = () => {
    return axios.post("/api/v1/logout");
}

// ======= USER =============

const fetchAllUserAPI = () => {
    return axios.get("/api/v1/users");
}

const fetchUserAccountAPI = () => {
    return axios.get("/api/v1/fetch-account");
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

const changeUserFaculty = (data) => {
    return axios.put(`/api/v1/user/change-faculty`, data);
}

const deleteUser = (_id) => {
    return axios.delete(`/api/v1/user/${_id}`);
}

const fetchDepartmentUser = (_id) => {
    return axios.get(`/api/v1/users/department/${_id}`);
}

// ================ FACULTY ============


const createFaculty = (data) => {
    return axios.post(`/api/v1/faculty`, data);
}

const fetchAllFaculties = () => {
    return axios.get(`/api/v1/faculty`);
}

const updateFaculty = (data) => {
    return axios.put(`/api/v1/faculty`, data);
}

const deleteFaculty = (_id) => {
    return axios.delete(`/api/v1/faculty/${_id}`);
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

const fetchMoreMessageHistory = (data) => {
    return axios.post(`/api/v1/message/history`, data);
}


// ================ POST ============

const createPost = (data) => {
    return axios.post(`/api/v1/post`, data);
}

const fetchAllPost = () => {
    return axios.get(`/api/v1/post`);
}

const updatePost = (data) => {
    return axios.put(`/api/v1/post`, data);
}

const deletePost = (_id) => {
    return axios.delete(`/api/v1/post/${_id}`);
}

const fetchMorePostAPI = (data) => {
    return axios.post(`/api/v1/post/history`, data);
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

export {
    handleLogin,
    handleGoogleLogin,
    fetchAllUserAPI,
    createUser,
    fetchUserAccountAPI,
    handleLogout,
    fetchAllRole,
    updateUserAPI,
    changeUserPassword,
    changeUserFaculty,
    deleteUser,
    callUploadUserImgAPI,
    callUploadMessageFileAPI,
    fetchConversationById,
    createConversation,
    fetchMessageHistoryById,
    fetchMoreMessageHistory,
    createPost,
    fetchAllPost,
    updatePost,
    deletePost,
    fetchMorePostAPI,
    fetchDepartmentUser,
    createFaculty,
    fetchAllFaculties,
    updateFaculty,
    deleteFaculty
}