import { useState } from 'react';

const useImageHandling = () => {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState({});
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
        // console.log("check file handleChange", info);
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
            });
        }
    };

    const handleUploadFile = async ({ file, onSuccess, onError }) => {
        // console.log("check file", file);
        setFile(file);
        if (file) {
            onSuccess('ok');
        } else {
            onError('Upload file failed!');
        }
    };

    return {
        loading,
        previewOpen,
        previewImage,
        previewTitle,
        file,
        setFile,
        handlePreview,
        beforeUpload,
        handleChange,
        handleUploadFile,
        setPreviewOpen,
        // Include other functions and state variables related to image handling here
    };
};

export default useImageHandling;
