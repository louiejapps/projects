export const DeveloperView = () => `
  <table class="form-table">
    <tr><td class="table-header">Application Architecture & System Flowchart</td></tr>
    <tr>
      <td>
        <h4 style="margin: 6px 0 2px 0;">1. Component & Module Architecture Tree</h4>
        <pre class="ascii-tree">
index.html
└── js/app.js (Main Controller & Router)
    ├── js/auth.js (Local Session Storage)
    ├── js/db/ (Database Layer Barrel)
    │   ├── firebase.js (App Init & DB Ref)
    │   ├── userDb.js (User Auth DB)
    │   ├── friendDb.js (Friends & Requests DB)
    │   ├── postDb.js (Posts & Replies DB)
    │   └── notificationDb.js (Notifications DB)
    └── js/components/ (React-Style UI Components)
        ├── PostCard.js
        ├── FeedView.js
        ├── ProfileView.js
        ├── DirectoryView.js
        ├── NotificationsView.js
        ├── DeveloperView.js
        └── utils.js
        </pre>

        <h4 style="margin: 10px 0 2px 0;">2. Layer Responsibilities Summary</h4>
        <table class="data-table" style="margin-top:4px;">
          <thead>
            <tr>
              <th>Layer</th>
              <th>Location</th>
              <th>Responsibility</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Controller</td>
              <td><code>js/app.js</code></td>
              <td>State store, router, event listeners.</td>
            </tr>
            <tr>
              <td>Components</td>
              <td><code>js/components/*.js</code></td>
              <td>Individual Capitalized component templates.</td>
            </tr>
            <tr>
              <td>Data Services</td>
              <td><code>js/db/*.js</code></td>
              <td>Realtime Firebase CRUD & subscriptions.</td>
            </tr>
            <tr>
              <td>Auth Store</td>
              <td><code>js/auth.js</code></td>
              <td>LocalStorage active user session.</td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
`;