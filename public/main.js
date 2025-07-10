const socket = io();
const bar = document.getElementById('notification-bar');

socket.on('notification', (data) => {
  bar.textContent = data.message;
  bar.classList.remove('hidden');

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    bar.classList.add('hidden');
  }, 5000);
});
