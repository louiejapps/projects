import dayjs from 'https://esm.sh/dayjs@1.11.10';
import { formatQuoteText } from './utils.js';

export const PostCard = (post, currentUser) => {
    const rawReplies = post.replies || post.comments || {};
    const repliesList = Object.entries(rawReplies)
        .map(([key, r]) => ({ replyKey: key, ...r }))
        .sort((a, b) => a.timestamp - b.timestamp);

    const canDeletePost = currentUser && (
        post.author.toLowerCase() === currentUser.toLowerCase() ||
        post.recipient.toLowerCase() === currentUser.toLowerCase()
    );

    return `
    <article class="post-card" id="post-${post.id}">
      <div class="post-header">
        By: <span class="post-author"><a href="#" class="user-link" data-user="${post.author}">${post.author}</a></span> 
        ${post.author !== post.recipient ? ` &rarr; Target: <a href="#" class="user-link" data-user="${post.recipient}">${post.recipient}</a>` : ''} 
        on <span>${dayjs(post.timestamp).format('YYYY-MM-DD HH:mm')}</span> 
        <span class="post-id">#${post.numericId || 1000}</span>
        ${canDeletePost ? ` [<a href="#" class="delete-post-btn" data-postid="${post.id}" style="color:#cc0000;">Delete Post</a>]` : ''}
      </div>

      <div class="post-body">${formatQuoteText(post.content)}</div>

      <!-- Nested Replies Section -->
      <div class="comments-container">
        ${repliesList.map(r => {
        const canDeleteReply = currentUser && (
            r.author.toLowerCase() === currentUser.toLowerCase() ||
            post.author.toLowerCase() === currentUser.toLowerCase()
        );

        return `
            <div class="comment-card">
              <div class="comment-header">
                <span class="post-author">${r.author}</span> at ${dayjs(r.timestamp).format('YYYY-MM-DD HH:mm')}
                ${canDeleteReply ? ` [<a href="#" class="delete-reply-btn" data-postid="${post.id}" data-replykey="${r.replyKey}" style="color:#cc0000;">Delete</a>]` : ''}
              </div>
              <div class="post-body">${formatQuoteText(r.content)}</div>
            </div>
          `;
    }).join('')}

        <span class="reply-toggle" data-postid="${post.id}">[Reply to post]</span>
        <div id="reply-box-${post.id}" class="hidden" style="margin-top: 6px;">
          <form class="reply-form" data-postid="${post.id}">
            <input type="text" class="reply-input" placeholder="Type a reply... (Type > to quote)" required />
            <button type="submit" class="retro-btn">Submit Reply</button>
          </form>
        </div>
      </div>
    </article>
  `;
};