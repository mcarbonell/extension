// Background.js


// Función para actualizar las reglas de bloqueo
function updateBlockedSites(blockedSites) {
    const rules = blockedSites.map((site, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: site,
        resourceTypes: ['main_frame']
      }
    }));
  
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map(rule => rule.id),
      addRules: rules
    });
  }
  
  // Cargar sitios bloqueados desde el almacenamiento y actualizar reglas
  chrome.storage.local.get(["blockedSites"], (result) => {
    const blockedSites = result.blockedSites || [];
    updateBlockedSites(blockedSites);
  });
  
  // Listener para cambios en el almacenamiento
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.blockedSites) {
      updateBlockedSites(changes.blockedSites.newValue);
    }
  });  


  chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
      text: "OFF",
    });
  });


  chrome.action.onClicked.addListener(async (tab) => {  
      // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
      const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
      // Next state will always be the opposite
      const nextState = prevState === 'ON' ? 'OFF' : 'ON'
  
      // Set the action badge to the next state
      await chrome.action.setBadgeText({
        tabId: tab.id,
        text: nextState,
      });    
  });

  /*
  chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error));
*/


  chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    console.log('Tab changed to:', tab.url);
    chrome.runtime.sendMessage({type: 'TAB_CHANGED', url: tab.url});
    // Aquí puedes hacer algo con la URL, por ejemplo, enviarla al servidor
  });
  
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
      console.log('URL changed to:', changeInfo.url);
      chrome.runtime.sendMessage({type: 'URL_CHANGED', url: changeInfo.url});
      // Aquí puedes hacer algo con la URL, por ejemplo, enviarla al servidor
    }
  });
