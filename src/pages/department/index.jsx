import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AskQuestion from "../../components/Student/Department/AskQuestion";
// import { handleGetDetailBookById } from "../../services/api";

const DepartmentPage = () => {
    // const [dataBook, setDataBook] = useState([]);
    // const location = useLocation();
    // // console.log("cehck location", location)

    // let params = new URLSearchParams(location.search);
    // const id = params?.get("id");
    // console.log('check id', id)

    // useEffect(() => {
    //     getBookDetail(id);
    // }, [id]);

    // const getBookDetail = async (id) => {
    //     const res = await handleGetDetailBookById(id);
    //     if (res && res.data) {
    //         let raw = res.data;
    //         raw.images = getImages(raw);
    //         setTimeout(() => {
    //             setDataBook(raw);
    //         }, 1000);
    //     }
    // }

    return (
        <>
            <div style={{ backgroundColor: '#fff', padding: '1rem' }}>

                <AskQuestion
                // dataBook={dataBook}
                />
            </div>

        </>
    )
}

export default DepartmentPage;