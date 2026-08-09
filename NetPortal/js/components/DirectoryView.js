import { escapeHtml, formatQuoteText } from './utils.js';

export const DirectoryView = (allUsers, currentFriends, outgoingRequests = [], currentUser, searchQuery = '') => {
    const query = searchQuery.toLowerCase().trim();

    const usersList = Object.values(allUsers)
        .filter(u => u.username.toLowerCase() !== currentUser.toLowerCase())
        .filter(u => u.username.toLowerCase().includes(query) || (u.bio && u.bio.toLowerCase().includes(query)));

    return `
    <table class="form-table">
      <tr><td class="table-header">Search Directory</td></tr>
      <tr>
        <td>
          <input type="text" id="directory-search" value="${escapeHtml(searchQuery)}" placeholder="Type username or keyword..." />
        </td>
      </tr>
    </table>

    <table class="data-table">
      <thead>
        <tr>
          <th>User Handle</th>
          <th>Status / Bio</th>
          <th>Friend Status</th>
        </tr>
      </thead>
      <tbody>
        ${usersList.length ? usersList.map(u => {
        const uName = u.username.toLowerCase();
        const isFriend = currentFriends.includes(uName);
        const isPending = outgoingRequests.includes(uName);

        return `
            <tr>
              <td><a href="#" class="user-link" data-user="${u.username}">${u.username}</a></td>
              <td>${formatQuoteText(u.bio || '')}</td>
              <td>
                ${isFriend
                ? `<button class="unfriend-dir-btn retro-btn" data-user="${u.username}" style="color:#cc0000;">Unfriend</button>`
                : isPending
                    ? '<em>Pending...</em>'
                    : `<button class="send-req-dir-btn retro-btn" data-user="${u.username}">+ Add Friend</button>`
            }
              </td>
            </tr>
          `;
    }).join('') : `
          <tr><td colspan="3" style="text-align:center;">No members found.</td></tr>
        `}
      </tbody>
    </table>
  `;
};