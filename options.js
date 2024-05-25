// Options.js
document.getElementById('saveBlocked').addEventListener('click', () => {
    const blockedSites = document.getElementById('blockedSites').value.split(',');
    chrome.storage.local.set({ blockedSites }, () => {
        alert('Sitios bloqueados guardados');
      });
  });
  
  document.getElementById('saveAllowed').addEventListener('click', () => {
    const allowedSites = document.getElementById('allowedSites').value.split(',');
    chrome.storage.local.set({ allowedSites }, () => {
        alert('Sitios permitidos guardados');
      });

  });