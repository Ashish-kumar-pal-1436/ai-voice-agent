import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) =>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return res.status(404).json({message: 'Failed to get current User'})
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message: `getCurrentUser error: ${error}`})
    }
}

export const saveAssitant = async (req, res) => {
    try {

        const {
            assitantName,
            businessName,
            businessType,
            businessDescription,
            tone,
            theme,
            geminiApiKey,
            pages,
        } = req.body

        const user = await User.findById(req.userId)

        if(!user){
            return res.status(404).json({message:"Failed to get current user"})
        }

        user.assitantName = assitantName;
        user.businessName = businessName;
        user.businessType = businessType;
        user.businessDescription = businessDescription;
        user.tone = tone;
        user.theme = theme;

        if(geminiApiKey){
            user.geminiApiKey = geminiApiKey
        }

        user.geminiStatus = "active";
        user.pages = pages || [];
        user.isSetupComplete = true
        await user.save()

        return res.status(200).json({
            message: "Assitant saved successfully", user
        })

    } catch (error) {
        return res.status(500).json({message: `getCurrentUser error ${error}`})
    }
}