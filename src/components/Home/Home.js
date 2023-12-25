import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Post from '../Post/Post'
import {
    fetchPosts,
    selectFilteredPosts,
    setSearchTerm,
    fetchComments,
  } from '../../app/redditSlice';
import getRandomNumber from "../../utils/getRandomNumber";
import PostLoading from "../Post/PostLoading";




const Home = () => {
    const reddit = useSelector((state) => state.reddit);
    const { loading, error, searchTerm, selectedSubReddit } = reddit;
    const posts = useSelector(selectFilteredPosts);
    console.log(posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddit))
    }, [selectedSubReddit]);

    if (loading) {
        return (
            <>
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
            </>
        )
    };

    const onToggleComments = (index) => {
        const getComments = (permalink) => {
            dispatch(fetchComments(index, permalink))
        }

        return getComments;
    }

    if (error) {
        console.log(error)
        return (
            <div className="error">
                <h2>Failed to fetch posts</h2>
                <button type="button" onClick={() => dispatch(fetchPosts(selectedSubReddit))}>
                    Try again
                </button>
            </div>
        )
    };

    if (posts.length === 0 && !loading) {
        return (
            <div className="error">
                <h2>No posts matchin '{searchTerm}'</h2>
                <button type="button" onClick={() => dispatch(setSearchTerm(''))}>
                    Go home
                </button>
            </div>
        )
    };

    return (
        <>
            {posts.map((post, index) => (
                <Post post={post} key={post.id} onToggleComments={onToggleComments(index)}/>
            ))}
        
        
        </>
    )



}

export default Home;