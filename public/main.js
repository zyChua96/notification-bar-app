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
  }, 5000);
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
    case 'system': return '#FF0000';  // yellow
    case 'order': return '#28a745';   // green
    default: return '#333';           // default
  }
}

//button for push
const sendBtn = document.getElementById('send-btn');
const notifType = document.getElementById('notif-type');
const notifMessage = document.getElementById('notif-message');

sendBtn.addEventListener('click', () => {
  console.log(`${notifType.value}`);
  const type = notifType.value;
  let  message = "";
  if(notifType.value == 'message'){
     message = "Message: " + notifMessage.value.trim();
  }else if(notifType.value == 'system'){
    message = "System Message: " + notifMessage.value.trim();
  }else if (notifType.value == 'order'){
    message = "Order Message: " + notifMessage.value.trim();
  }else{
    message = "Invalid message type";
  }
  // const message = notifMessage.value.trim();

  if (message === '') return alert('Please enter a message.');

  // Send the notification data to the server
  socket.emit('new-notification', { type, message });

  // Clear input
  notifMessage.value = '';
});

