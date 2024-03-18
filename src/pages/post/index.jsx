import { useLocation } from "react-router-dom";
import PostOfDepartment from "../../components/Post/PostOfDepartment";
import { fetchPostsByFaculty, fetchUser, fetchMorePostsByFaculty } from "../../services/api";
import { useEffect, useState } from "react";

const PostPage = () => {
    const location = useLocation();
    const [postList, setPostList] = useState([]);
    const [departmentInfo, setDepartmentInfo] = useState({});
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    let params = new URLSearchParams(location.search);
    const _id = atob(params?.get("id"));

    useEffect(() => {
        getPostByFacultyId(_id);
    }, [_id]);

    const getPostByFacultyId = async (_id) => {
        try {
            const res = await fetchPostsByFaculty(_id);
            if (res && res.data && res.errCode === 0) {
                // let raw = res.data;
                // setTimeout(() => {
                //     setPostList(raw);
                // }, 1000);
                console.log("check posts", res.data);
                setPostList(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getDepartmentInfo(_id);
    }, [_id]);

    const getDepartmentInfo = async (_id) => {
        try {
            const res = await fetchUser(_id);
            if (res && res.data && res.errCode === 0) {
                setDepartmentInfo(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const fetchMorePost = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        if (postList.length !== 0) {
            let lastPostId = postList[postList.length - 1]._id;
            const res = await fetchMorePostsByFaculty({ 'lastPostId': lastPostId, 'authorId': _id });
            if (res && res.errCode === 0 && res.data) {
                setTimeout(() => {
                    if (res.data.length !== 0) {
                        setPostList((list) => [...list, ...res.data]);
                    } else {
                        setHasMore(false);
                    }
                    setLoading(false);
                }, 3000);
            } else {
                setLoading(false);
            }
        }
    };


    return (
        <>
            <PostOfDepartment
                postList={postList}
                departmentInfo={departmentInfo}
                fetchMorePost={fetchMorePost}
                hasMore={hasMore}
            />
        </>
    )
}

export default PostPage;