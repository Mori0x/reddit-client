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
import shortenNumber from '../../utils/shortenNumber'
import Comment from '../Comment/Comment'

import './Post.css'

const Post = (props) => {
    const [voteValue, setVoteValue] =  useState(0);
    const {post, onToggleComments} = props;
    const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

    const onHandleVote = (newValue) => {
        if (newValue === voteValue) {
            setVoteValue(0)
        } else if (newValue === 1) {
            setVoteValue(1)
        } else {
            setVoteValue(-1)
        }
    };

    const renderUpVote = () => {
        if (voteValue === 1) {
          return <TiArrowUpThick className="icon-action" />;
        }
        return <TiArrowUpOutline className="icon-action" />;
      };
    
      const renderDownVote = () => {
        if (voteValue === -1) {
          return <TiArrowDownThick className="icon-action" />;
        }
        return <TiArrowDownOutline className="icon-action" />;
      };


      const getVoteType = () => {
        if (voteValue === 1) {
            return 'up-vote'
        } else if (voteValue === -1) {
            return 'down-vote'
        }
        return ''
      }

      const renderComments = () => {
        if (post.errorComments) {
            return (
                <div>
                    <h3>Error loading comments</h3>
                </div>
            )
        }

        if (post.loadingComments) {
            return (
                <div>
                    <div class="skeleton comment"></div>
                    <div class="skeleton comment"></div>
                    <div class="skeleton comment"></div>
                    <div class="skeleton comment"></div>
                </div>
            )
        }

        if (post.showingComments) {
            
            return (
                <div>
                    {post.comments.map((comment) => (
                        
                        <Comment comment={comment} key={comment.id} />
                    ))}
                </div>
            )
        }
      }


    return (
        <article key={post.id}>
            <Card>
                <div className="post-wrapper">
                    <div className="post-votes-container">
                    <button
                        type="button"
                        className={`icon-action-button up-vote ${
                          voteValue === 1 && 'active'
                        }`}
                        onClick={() => onHandleVote(1)}
                        aria-label="Up vote"
                    >
                      {renderUpVote()}
                    </button>
                        <p className={`vote-count ${voteValue === 1 ? 'up-vote' : voteValue === -1 ? 'down-vote' : ''}`}>{shortenNumber(post.ups, 1)}</p>
                    <button
                        type="button"
                        className={`icon-action-button down-vote ${
                          voteValue === -1 && 'active'
                        }`}
                        onClick={() => onHandleVote(-1)}
                        aria-label="Down vote"
                        >
                          {renderDownVote()}
                        </button>
                    </div>
                    <div className="post-container">
                        <h3 className="post-title">{post.title}</h3>
                        <div className="post-image-container">
                            {photoExtensions.some(ext => post.url.endsWith(`.${ext}`)) && <img src={post.url} className="post-image"/>}
                        </div>
                        <div className="post-details">
                            <span className="author-details">
                                <span className="author-username">{post.author} </span>
                            </span>
                            <span>{moment.unix(post.created_utc).fromNow()}</span>
                            <span className="post-comments-container">
                                <button
                                type="button"
                                onClick={() => onToggleComments(post.permalink)}
                                className={`icon-action-button ${
                                    post.showingComments && 'showing-comments'
                                }`}
                                >
                                <TiMessage className="comments-icon" />
                                </button>
                                {shortenNumber(post.num_comments, 1)}
                            </span>
                        </div>
                        {renderComments()}
                    </div>
                </div>
            </Card>
        </article>
    )

}

export default Post