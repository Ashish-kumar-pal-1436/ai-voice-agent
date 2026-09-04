(function (){
   //userData
   const script = document.currentScript;
   const userId = script?.dataset?.userId
   const theme= "dark"
   const assistantConfig = null 

   //load css
   const link = document.createElement("link")
   link.rel ="stylesheet"
   link.href = "http://localhost:5173/assitant.css"
   document.head.appendChild(link) 
   
   // Create Popup

   const popup = document.createElement("div")
   popup.className = `Sunday-popup theme ${theme}`
})();