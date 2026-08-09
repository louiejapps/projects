import dayjs from 'https://esm.sh/dayjs@1.11.10';
import { escapeHtml } from './utils.js';

export const NotificationsView = (notifs, requests) => {
    const pendingRequests = Object.values(requests);

    return `
    <table class="form-table">
      <tr><td class="table-header">Pending Friend Requests (${pendingRequests.length})</td></tr>
      <tr>
        <td>
          ${pendingRequests.length ? pendingRequests.map(req => `
            <div style="margin-bottom:6px;">
              <strong>${req.from}</strong> wants to connect.
              [<a href="#" class="accept-req-btn" data-user="${req.from}">Accept</a>] 
              [<a href="#" class="decline-req-btn" data-user="${req.from}">Decline</a>]
            </div>
          `).join('') : '<div>No pending friend requests.</div>'}
        </td>
      </tr>
    </table>

    <table class="form-table">
      <tr><td class="table-header">Notifications Log</td></tr>
      <tr>
        <td>
          ${notifs.length ? notifs.map(n => `
            <div style="margin-bottom:6px; border-bottom:1px dotted #ccc; padding-bottom:3px;">
              ${escapeHtml(n.text)} 
              <span style="font-size:9px; color:#666;">(${dayjs(n.timestamp).format('YYYY-MM-DD HH:mm')})</span>
              [<a href="#" class="dismiss-notif-btn" data-id="${n.id}">Dismiss</a>]
            </div>
          `).join('') : '<div>No notifications.</div>'}
        </td>
      </tr>
    </table>
  `;
};