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

  /*
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
  */