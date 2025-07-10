const socket = io();
const bar = document.getElementById('notification-bar');
const message = document.getElementById('notification-message');
let dismissTimeout;

socket.on('notification', (data) => {
  message.textContent = data.message;

  // Apply styles by type
  bar.style.backgroundColor = getColorByType(data.type);

  bar.classList.remove('hidden');

  // Auto-dismiss after 5 seconds
  clearTimeout(dismissTimeout);
  dismissTimeout = setTimeout(() => {
    bar.classList.add('hidden');
  }, 10000);
});

// Manual close
const closeBtn = document.getElementById('close-btn');

closeBtn.addEventListener('click', () => {
  bar.classList.add('hidden');
  clearTimeout(dismissTimeout);
});
function getColorByType(type) {
  switch (type) {
    case 'message': return '#2d89ef'; // blue
    case 'system': return '#ffcc00';  // yellow
    case 'order': return '#28a745';   // green
    default: return '#333';           // default
  }
}
