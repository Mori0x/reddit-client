import React, {useState} from "react";
import Skeleton from 'react-loading-skeleton';
import {
    TiArrowUpOutline,
    TiArrowUpThick,
    TiArrowDownOutline,
    TiArrowDownThick,
    TiMessage,
  } from 'react-icons/ti';
import Card from '../Card/Card'
import moment from 'moment';

import './Post.css'

const Post = (props) => {
    const [voteValue, setVoteValue] =  useState(0);
    const {post, toggleComments} = props;

    const onHandleVote = (newValue) => {
        if (newValue === voteValue) {
            setVoteValue(0)
        } else if (newValue === 1) {
            setVoteValue(1)
        } else {
            setVoteValue(-1)
        }
    }


    return (
        <article key={post.id}>
            <Card>
                <div className="post-wrapper">
                    <div className="post-votes-container">
                        <button type="button" className={`icon-action-button up-vote`}>
                            
                        </button>
                    </div>
                    <div className="post-container">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-image-container">
                            <img src={post.url} className="post-image"/>
                        </div>
                        <div className="post-details">
                            <span className="author-details">
                                <span className="author-username">{post.author} </span>
                            </span>
                            <span>{moment.unix(post.created_utc).fromNow()}</span>
                            <span className="post-comments-container">
                                <button
                                type="button"
                                className={`icon-action-button ${
                                    post.showingComments && 'showing-comments'
                                }`}
                                >
                                <TiMessage />
                                </button>
                            </span>
                        </div>
                    </div>
                </div>
            </Card>
        </article>
    )

}

export default Post