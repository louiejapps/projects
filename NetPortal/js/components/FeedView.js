import { PostCard } from './PostCard.js';

export const FeedView = (posts, currentUser) => `
  <table class="form-table">
    <tr><td class="table-header">Create New Post</td></tr>
    <tr>
      <td>
        <form id="feed-form">
          <textarea id="feed-input" rows="3" placeholder="What's on your mind? (Type > to quote)" required></textarea><br>
          <button type="submit" class="retro-btn">Post Message</button>
        </form>
      </td>
    </tr>
  </table>

  <h3 style="color:var(--header-bg); margin-bottom:8px;">Community Feed</h3>
  <div id="feed-container">
    ${posts.length ? posts.map(p => PostCard(p, currentUser)).join('') : '<div>No activity recorded on feed.</div>'}
  </div>
`;