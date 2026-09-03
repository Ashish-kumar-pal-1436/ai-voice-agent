import { useState } from "react"
import { FiPlus, FiTrash2 } from "react-icons/fi"

const THEMES = [
   "light",
   "dark",
   "glass",
   "neon"
]

const TONES = [
  "friendly",
  "professional",
  "sales"
]

const Builder = ({user, setUser}) => {

  const [assitantName, setAssitantName] = useState(user?.assitantName || "")

  const [businessName, setBusinessName] = useState(user?.businessName || "") 

  const [businessType, setBusinessType] = useState(user?.businessType || "")

  const [businessDescription, setBusinessDescription] = useState(user?.businessDescription || "")

  const [theme, setTheme] = useState(user?.theme || "dark") 
  const [tone, setTone] = useState(user?.tone || "friendly")
  const [geminiApiKey, setGeminiApiKey] = useState(user?.geminiApiKey || "") 

  const [pages, setPages] = useState(user?.pages || [])
  const [pageName, setPageName] = useState("")
  const [pagePath, setPagePath] = useState("")
  const [pageKeywords, setPageKeywords] = useState("")
  const [loading, setLoading] = useState(false)

  const addPage = () =>{
    // if(!pageName || pagePath) return 

    const newPage = {
        name: pageName,
        path: pagePath,
        keywords: pageKeywords.split(",").map((k) =>k.trim())
    } 

    setPages([...pages, newPage])
    setPageName("")
    setPagePath("")
    setPageKeywords("")
  }

  const removePage = (index) =>{
      const updatePages = pages.filter((_,i) =>i !== index)
      setPages(updatePages)
  }

  return (
    <div className="min-h-screen bg-[#f7f8fc] px-4 py-8">
         <div className="max-w-4xl mx-auto">
            <div className="mb-8" >

                <h2 className="text-3xl font-bold text-[#081028]">
                    Assitant Builder
                </h2>

                <p className="text-gray-500 mt-1">
                   Customize your virtual assitant
                </p>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                   <h2 className="text-lg font-semibold mb-5">
                     Basic Information
                   </h2> 
                   <div className="space-y-4">

                       <input type="text"
                         placeholder="Assitant Name"
                         onChange={(e)=>setAssitantName(e.target.value)}
                         value={assitantName}
                         className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                       /> 

                       <input type="text"
                         placeholder="Business Name"
                         onChange={(e)=>setBusinessName(e.target.value)}
                         value={businessName}
                         className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                       />

                       <input type="text"
                         placeholder="Business Type"
                         onChange={(e)=>setBusinessType(e.target.value)}
                         value={businessType}
                         className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                       />

                       <textarea type="text"
                         rows={4}
                         placeholder="Business Description"
                         onChange={(e)=>setBusinessDescription(e.target.value)}
                         value={businessDescription}
                         className="w-full border border-gray-200 rounded-2xl px-4 py-3 resize-none"
                       />

                   </div>
                </div> 

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-lg font-semibold mb-5">
                      Appearance
                  </h2> 
                  <div>
                     <label className="text-sm text-gray-600 mb-3 block">Theme</label>
                     <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {THEMES.map((item) =>(
                           <button key={item}
                              onClick={()=>setTheme(item)}
                              className={`py-3 rounded-2xl border-2 capitalize ${theme===item
                              ? "border-purple-500 bg-purple-50 text-purple-700"
                              : "border-gray-200"
                           }`} >
                              {item}
                           </button>
                        ))}
                     </div>
                  </div>

                   <div className="mt-6">
                     <label className="text-sm text-gray-600 mb-3 block">Assitant Tone</label>
                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {TONES.map((item) =>(
                           <button key={item}
                              onClick={()=>setTone(item)}
                              className={`py-3 rounded-2xl border-2 capitalize ${tone===item
                              ? "border-purple-500 bg-purple-50 text-purple-700"
                              : "border-gray-200"
                           }`} >
                              {item}
                           </button>
                        ))}
                     </div>
                  </div>

              </div>
                 
                 <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                     <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
                         <div>
                           <h2 className="text-lg font-semibold">
                             Gemini API KEY
                           </h2> 
                           <p className="text-sm text-gray-400 mt-1">
                              Add your Gemini API key to power your assitant
                           </p>
                         </div> 
                         <a href="https://aistudio.google.com/app/apikey" 
                           target="_blank"
                           rel="noopener noreferrer"
                           className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white text-sm font-medium hover:scale-[1.02] transition-all cursor-pointer"
                         >
                            Get API KEY
                         </a>
                     </div> 

                     <input type="password" 
                       onChange={(e)=>setGeminiApiKey(e.target.value)}
                       value={geminiApiKey}
                       placeholder="AIza..."
                       className="w-full border border-gray-200 rounded-2xl px-4 py-3"
                     /> 
                     <p className="text-xs text-gray-400 mt-3 leading-6">
                         Your API key is securly stored and only used for generating AI responses
                     </p>
                 </div> 

                 <div className=" bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
                      <div className="flex items-center justify-between mb-5 flex-wrap">
                          <div>
                             <h2 className="text-lg font-semibold"> Navigation Pages </h2>
                             <p className="text-sm text-gray-400">Assitant can redirect users</p>
                          </div> 
                          <button 
                          onClick={addPage}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from bg-purple-500 to-emerald-500 text-white text-sm cursor-pointer">
                              <FiPlus /> Add
                          </button>
                      </div> 

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 ">
                          
                           <input type="text" 
                             placeholder="Page Name"
                             className="border border-gray-200 rounded-2xl px-4 py-3"
                             onChange={(e)=>setPageName(e.target.value)}
                             value={[pageName]}
                           />

                           <input type="text" 
                             placeholder="/pricing"
                             className="border border-gray-200 rounded-2xl px-4 py-3"
                             onChange={(e)=>setPagePath(e.target.value)}
                             value={[pagePath]}
                           />

                           <input type="text" 
                             placeholder="Pricing, Plan"
                             className="border border-gray-200 rounded-2xl px-4 py-3"
                             onChange={(e)=>setPageKeywords(e.target.value)}
                             value={[pageKeywords]}
                           />
                      </div> 

                      <div className="mt-5 space-y-3">
                          {pages.map((page,index) =>(
                             <div key={index} 
                                  className="flex items-center justify-between border border-gray-100 rounded-2xl p-4"
                             > 
                                <div>
                                   <p className="font-medium">{page.name}</p>
                                   <p className="text-sm text-gray-400">{page.path}</p>
                                </div>
                                <button 
                                 onClick={()=>removePage(index)}
                                className="text-red-500">
                                    <FiTrash2 />
                                </button>
                             </div>
                          ))}
                      </div>

                 </div>

                 <div>
                   <button 
                     disabled={loading}
                    className="w-full h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-emerald-500 text-white font-semibold">
                          {
                            loading ? "Saving..." : user.isSetupComplete ? "Updade Assitant" : "Save Assitant"
                          }
                   </button>
                 </div>

            </div>
         </div>
    </div>
  )
}

export default Builder