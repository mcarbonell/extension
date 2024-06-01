(async () => {
    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    console.log(tab.url);
    document.getElementById('currurl').textContent = tab.url;
    // ..........
  })();


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TAB_CHANGED' || message.type === 'URL_CHANGED') {
      document.getElementById('currurl').textContent = message.url;
    }
  });


  document.getElementById('returninfo').textContent= 'Probando';

  console.log('Text fetch');

  fetch('http://www.google.com/')
  .then(response => console.log(response) );