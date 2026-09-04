(function (){
   //userData
   const script = document.currentScript;
   const userId = script?.dataset?.userId
   const theme= "dark"
   const assistantConfig = null 

   //load css
   const link = document.createElement("link")
   link.rel ="stylesheet"
   link.href = "http://localhost:5173/assistant.css"
   document.head.appendChild(link) 
   
   // Create Popup

   const popup = document.createElement("div")
   popup.className = `sunday-popup theme ${theme}`

   popup.innerHTML = ` 

     <div class="sunday-overlay"> </div>

     <div class="sunday-content"> 
          <div class="sunday-top"> 
             <div class="sunday-orb-wrap"> 
                 <div class="sunday-orb-glow"> </div>
                 <div class="sunday-orb"> </div>
             </div> 
              <h2 class="sunday-title"> Hello I'm Sunday AI </h2>
              <p class="sunday-sub">
                Your smart voice assitant. 
                <br />
                Ask anything about your website
              </p> 

              <div class="sunday-status"> Tap button to Speak </div> 

              <div class="sunday-wave"> 
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div> 

              <!-- User text -->
              <div class="sunday-user-text"> </div>

              <!-- AI Text -->
              <div class="sunday-ai-text">  </div>

          </div> 

          <div class="sunday-bottom">
             <button class="sunday-mic"> 
              <img 
                 src="http://localhost:5173/mic2.svg"
                 alt="mic"
                 class="sunday-mic-icon"
               />
             </button>
          </div>

     </div>

   `

   document.body.appendChild(popup);

   // floating Button

   const button = document.createElement("button")

   button.className = `sunday-btn theme-${theme}`

   button.innerHTML =`
      <img 
        src="http://localhost:5173/logo.png"
        alt="logo"
      />`;
    document.body.appendChild(button)

    //toggle popup

    let open = false

    button.onclick = ()=>{
      open = !open;
      popup.style.display = open ? "flex" : "none";
    }

})();