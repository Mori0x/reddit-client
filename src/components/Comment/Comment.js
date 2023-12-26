import React from "react";
import moment from "moment";
import ReactMarkdown from 'react-markdown';
import './Comment.css'


const Comment = (props) => {
    const { comment } = props;
    
    const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    
    const modifiedComment = {...comment}

    try {
    modifiedComment.body = modifiedComment.body.replace(linkPattern, (match, linkName, url) => {
        
        if (linkName.includes('http')) {
          return `[Link](${url})`;
        } else {
          
          return match;
        }
      });
    } catch(error) {
        console.log(error)
    }

    
    return (
        <div className="comment">
            <div className="comment-metadata">
                <p className="comment-author">{comment.author}</p>
                <p className="comment-created-time">{moment.unix(comment.created_utc).fromNow()}</p>
            </div>
            <div className="comment-body">
                <ReactMarkdown children={modifiedComment.body} />
            </div>
        </div>
    )
}

export default Comment;