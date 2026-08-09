export const escapeHtml = (str) =>
    (str || '').replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

export const formatQuoteText = (text) =>
    text
        .split('\n')
        .map(line => line.startsWith('>')
            ? `<span class="quote-text">${escapeHtml(line)}</span>`
            : escapeHtml(line))
        .join('<br>');