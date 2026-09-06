import User from "../models/user.model.js"

export const getAssistantConfig = async (req, res) =>{
    try {
        const {userId} = req.params

        const user = await User.findById(userId).select("-geminiApiKey") 
        if(!user){
            return res.status(404).json({message: "Failed to get user"})
        }
        return res.status(200).json({message:"Assitant Config Data", user})
    } catch (error) {
        return res.status(500).json({message: `Assistant  Config Failed ${error}`})
    }
}

export const askAssistant = async (req, res) => {
    try {
        const {message, userId} = req.body 
        if(!message || userId){
            return res.status(400).json({message:"Message and userId are required"})
        }

        const user = await User.findById(userId) 

        if(!user) {
             return res.status(404).json({message: "User is not found"})
        } 

        if(!user.geminiApiKey){
            return res.status(404).json({message:"gemini apikey is not added"})
        }

        if(user.plan === "free" && user.totalMessages >= user.requestLimit){
            return res.status(400).json({message: "Free limit reached"})
        } 

        if(user.plan === "pro" && new Date(user.proExpiresAt) < new Date()){
            user.plan === "free"
            await user.save()
            return res.status(400).json({message: "Pro plan expired"})
        }

        const cleanMessage = message.toLowerCase() 

        if(user.enableNavigation){

            // Navigation Commands
            const navigationWords = [
                "open",
                "go",
                "start",
                "show",
                "navigate",
                "task me"
            ]

            //Check navigation intent
            const wantsNavigation =
             navigationWords.some((word) =>
                cleanMessage.startWith(word)
            )

            //User wants navigation

            if(wantsNavigation) {

                //Find matching page
                const matchedPage =
                user.pages.find((page) =>
                    page.keywords.some((keyword) =>
                        cleanMessage.includes(
                            keyword.toLowerCase()
                        )
                    )
                )

                // Page found
                if (matchedPage) {

                    //Already open
                    if (
                        req.body.currentPath === 
                        matchedPage.path
                    ) {
                        return res.json({
                            success: true,
                            response:
                            `${matchedPage.name} already open`
                        })
                    }

                    // Navigate

                    return res.json({
                        success: true,
                        action: "navigate",
                        path: matchedPage.path,
                        response:
                        `Opening ${matchedPage.name}`
                    })

                }
            }
        }
    } catch (error) {
        
    }
}