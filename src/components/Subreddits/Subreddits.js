import React, { useEffect } from "react";
import Card from '../Card/Card';
import { fetchSubreddits, selectSubreddits } from "../../app/subRedditSlice";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSubreddit, selectSelectedSubreddit } from '../../app/redditSlice';
import './Subreddits.css'

const Subreddits = () => {
    const dispatch = useDispatch();
    const subreddits = useSelector(selectSubreddits);
    const {isLoading} = useSelector((state) => state.subreddits);
    console.log(isLoading)
    const selectedSubReddit = useSelector(selectSelectedSubreddit);

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch])


    return (
        
        <Card className='subreddit-card'>
            <h2>Subreddits</h2>
            <ul className="subreddits-list">
                {subreddits.map((subreddit) => (
                    <li key={subreddit.id} className={`${selectedSubReddit === subreddit.url && `selected-subreddit`}`}>
                        <button type="button" onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}>
                            <img src={subreddit.icon_img} className="subreddit-icon" />
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
            </ul>
        </Card>
    )


}

export default Subreddits