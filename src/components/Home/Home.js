import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { AnimatedList } from "react-animated-list";
import Post from '../Post/Post'
import {
    fetchPosts,
    selectFilteredPosts,
    setSearchTerm,
    fetchComments,
  } from '../../app/redditSlice';

const Home = () => {
    const reddit = useSelector((state) => state.reddit);
    const { isLoading, error, searchTerm, selectedSubReddit } = reddit;
    const posts = useSelector(selectFilteredPosts);
    console.log(posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts(selectedSubReddit))
    }, [selectedSubReddit]);


    if (isLoading) {
        return (
            <AnimatedList animation="zoom">
                {Array(5).fill()}
            </AnimatedList>
        )
    };

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

    if (posts.length === 0) {
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
                <Post post={post} key={post.id} />
            ))}
        
        
        </>
    )



}

export default Home;