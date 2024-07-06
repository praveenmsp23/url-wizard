console.log("Wizard researching in background...")

chrome.runtime.onInstalled.addListener(() => {
  console.log("Ready for magic...")
})
