import { useState } from 'react';
import { callUploadFileAPI } from '../services/api';

const useImageHandling = () => {
    const [loading, setLoading] = useState(false);
    const [imgBase64, setImgBase64] = useState("");
    const [public_id, setPublic_id] = useState(null);
    const [urlImage, setUrlImage] = useState(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview && file.originFileObj) {
            // file.preview = await getBase64(file.originFileObj);
            getBase64(file.originFileObj, (url) => {
                setPreviewImage(url);
                setPreviewOpen(true);
                setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
            });
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange = (info) => {
        console.log("check file handleChange", info);
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
            });
        }
    };

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        const res = await callUploadFileAPI(file, public_id);
        if (res && res.data && res.errCode === 0) {
            let public_id = res.data.public_id;
            let url = res.data.url;
            setPublic_id(public_id);
            setUrlImage(url);
            onSuccess('ok');
        } else {
            onError('Upload file failed!');
        }

    };

    // Define getBase64 and other necessary functions related to image handling here

    return {
        loading,
        previewOpen,
        previewImage,
        previewTitle,
        imgBase64,
        public_id,
        urlImage,
        setImgBase64,
        handlePreview,
        beforeUpload,
        handleChange,
        handleUploadFile,
        setPreviewOpen,
        setPublic_id,
        setUrlImage,
        // Include other functions and state variables related to image handling here
    };
};

export default useImageHandling;
