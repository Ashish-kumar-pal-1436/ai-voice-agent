(function (){
   //userData
   const script = document.currentScript;
   const userId = script?.dataset?.userId
   const theme= "light"
   let assistantConfig = null;

   //load css
   const link = document.createElement("link")
   link.rel ="stylesheet"
   link.href = "http://localhost:5173/assistant.css"
   document.head.appendChild(link) 
   
   // Create Popup

   const popup = document.createElement("div")
   popup.className = `sunday-popup theme-${theme}`

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

    //load assistant

    const loadAssistant = async () =>{
       try {
          const res = await fetch(`http://localhost:8000/api/assistant/config/${userId}`)

            const data = await res.json() 

           console.log(data)

           if(data){
             
             assistantConfig = data.user
             applyConfig()
          }
       } catch (error) {
         console.log("Assistant Load Error", error)
       }
    }

    // const applyConfig = ()=>{

    //   if(!assistantConfig) return;

    //    popup.className = `sunday-popup theme-${assistantConfig.theme}`
    //    button.className = `sunday-btn theme-${assistantConfig.theme}`
    // } 

    const applyConfig = ()=>{ 

    if(!assistantConfig) return; 

    const selectedTheme = assistantConfig.theme?.toLowerCase();

    popup.className = `sunday-popup theme-${selectedTheme}`;
    button.className = `sunday-btn theme-${selectedTheme}`;

    const title = popup.querySelector('.sunday-title')
    title.innerHTML = `Hello I'm ${assistantConfig.assistantName}` 

    const subTitle = popup.querySelector('.sunday-sub')
    subTitle.innerHTML = `  
       Welcome to 
       ${assistantConfig.businessName}.
       <br /> 
       Ask anything about your website.
    `
}

    loadAssistant ()

    // Element

    const status = popup.querySelector(".sunday-status")

    const wave = popup.querySelector(".sunday-wave")

    const userText = popup.querySelector(".sunday-user-text")

    const aiText = popup.querySelector(".sunday-ai-text")

    const mic  = popup.querySelector(".sunday-mic")

    // text-speech

    const speak = (text) =>{
       window.speechSynthesis.cancel();

       // Show AI response

       aiText.innerHTML = "AI Speaking...."
       const speech = new SpeechSynthesisUtterance(text)

       speech.lang = "hi-IN"
       speech.rate = 1
       speech.pitch = 1
       speech.volume = 1

       // Voice end

       speech.onend = () => {
         status.innerHTML = "Tap button to Speak"
         wave.style.opacity = 0 
       } 

       // Start speaking
       window.speechSynthesis.speak(
          speech
       )
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if(SpeechRecognition){
      
      const recognition = new SpeechRecognition()

      recognition.lang = "en-US"
      recognition.continous = false
      recognition.interimResults = false

      mic.onclick= ()=>{
        wave.style.opacity = "1"
        status.innerText = "Listening..."
        userText.innerText = ""
        aiText.innerText = ""
        recognition.start()
      }

      recognition.onresult = (e)=>{
        const text = e.results[0][0].transcript

        userText.innerText = "You: " + text
        recognition.stop() 

        setTimeout( async () => {
           try {
              status.innerText = "Thinking..."
              const res = await fetch('http://localhost:8000/api/assistant/ask', {
                 method: "POST",
                 headers: {
                  "Content-Type":
                  "application/json"
                 } ,
                 body: JSON.stringify({
                  message:text,
                  userId
                 })
              })

              const data = await res.json()
              console.log(data)

              if(data.success){
                if(data.action === "navigate"){
                  
                }
              }
           } catch (error) {
            
           }
        } )
      }
    }



})();