import axios from "../utilizes/axiosFlask";

const sendQuestionDataToFlaskServer = async (data) => {
    try {
        return await axios({
            method: 'post',
            url: '/api/v1/chatbot-answer',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({ question: data })
        })
    } catch (error) {
        console.error("Error sending question data to Flask server:", error);
        throw error;
    }
};

export {
    sendQuestionDataToFlaskServer,
};