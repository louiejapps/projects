import { PostCard } from './PostCard.js';
import { formatQuoteText } from './utils.js';

export const ProfileView = (user, friends, isSelf, isFriend, isPending, userPosts, currentUser) => `
  <table class="form-table">
    <tr><td colspan="2" class="table-header">Member Profile: ${user.username}</td></tr>
    <tr><td class="label">Username</td><td>${user.username}</td></tr>
    <tr><td class="label">Status / Bio</td><td>${formatQuoteText(user.bio || 'None')}</td></tr>
    <tr><td class="label">Friends</td><td>${friends.length} Connected</td></tr>
    ${!isSelf ? `
      <tr>
        <td class="label">Action</td>
        <td>
          ${isFriend
            ? `<button id="unfriend-btn" class="retro-btn" data-user="${user.username}" style="color:#cc0000;">Unfriend</button>`
            : isPending
                ? '<em>[ Friend Request Pending ]</em>'
                : `<button id="send-req-btn" class="retro-btn" data-user="${user.username}">Send Friend Request</button>`
        }
        </td>
      </tr>
    ` : ''}
  </table>

  <table class="form-table">
    <tr><td class="table-header">Post on ${isSelf ? 'My Board' : `${user.username}'s Board`}</td></tr>
    <tr>
      <td>
        <form id="board-form" data-recipient="${user.username}">
          <textarea id="board-input" rows="3" placeholder="Write a message..." required></textarea><br>
          <button type="submit" class="retro-btn">Submit Post</button>
        </form>
      </td>
    </tr>
  </table>

  <h3 style="color:var(--header-bg); margin-bottom:8px;">Board Messages</h3>
  <div id="board-posts-container">
    ${userPosts.length ? userPosts.map(p => PostCard(p, currentUser)).join('') : '<div>No messages posted on this board.</div>'}
  </div>
`;