(async () => {
    // see the note below on how to choose currentWindow or lastFocusedWindow
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    // document.getElementById('history').textContent += tab.url;
    document.getElementById('history').innerHTML = tab.url + '<br/>' + document.getElementById('history').innerHTML;
    console.log(tab.url);
    console.log('FOCUSED');
  })();


  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'TAB_CHANGED' || message.type === 'URL_CHANGED') {
      document.getElementById('history').innerHTML = message.url + '<br/>' + document.getElementById('history').innerHTML;
      console.log('TAB_CHANGED || URL_CHANGED');
    }
  });