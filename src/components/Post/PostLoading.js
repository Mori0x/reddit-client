import React from 'react';
import './Post.css';
import './PostLoading.css';
import {
  TiArrowUpOutline,
  TiArrowDownOutline,
  TiMessage,
} from 'react-icons/ti';

const PostLoading = () => {
  return (
    <article className="post">
      <div className="post-votes-container">
        <button
          type="button"
          className="icon-action-button up-vote"
          aria-label="Up vote"
        >
          <TiArrowUpOutline className="icon-action" />
        </button>
        <div className="skeleton post-votes-value post-votes-value-loading" ></div>
        <button
          type="button"
          className="icon-action-button down-vote"
          aria-label="Down vote"
        >
          <TiArrowDownOutline className="icon-action" />
        </button>
      </div>
      <div className="post-container">
        <h3 className="post-title">
          <div class="skeleton title"></div>
        </h3>

        <div className="post-image-container">
          <div class="skeleton image"></div>
        </div>
        <br/>
        <div className="post-details">
          <span>
            <div class="skeleton author-name"></div>
          </span>
          <span>
            <div class="skeleton date"></div>
          </span>
          <span className="post-comments-container">
            <button
              type="button"
              className="icon-action-button"
              aria-label="Show comments"
            >
              <TiMessage className="icon-action" />
            </button>
            <div class="skeleton comment-count"></div>
          </span>
        </div>
      </div>
    </article>
  );
};

export default PostLoading;
