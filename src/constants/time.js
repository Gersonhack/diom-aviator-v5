function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('live-time').textContent = `${hours}:${minutes}:${seconds}s`;
}

// Atualizar a cada segundo
updateTime();
setInterval(updateTime, 1000);