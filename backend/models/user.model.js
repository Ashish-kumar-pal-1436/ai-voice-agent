import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({

      name: {
        type: String,
      },

      path: {
        type: String,
      },

      keywords: {
        type: [String],
        default: [],
      },
}, {_id: false})

const userSchema = new mongoose.Schema({

     name: {
        type: String,
        required: true
     }, 

     email: {
        type: String,
        required: true,
        unique: true
     },

     assitantName: {
        type: String,
        default: "Sunday"
     },

     businessName: {
        type: String,
        default: ""
     },

     businessType: {
        type: String,
        defualt: ""
     }, 

     businessDesc: {
        type: String,
        defualt: ""
     },

     tone: {
        type: String,
        enum: [
            "friendly",
            "professional",
            "sales"
        ],

        default: "friendly"
     },

     theme: {
        type: String,
        enum: [
            "light",
            "dark", 
            "glass",
            "neon"
        ],

        default: "dark"
     },

     enableVoice: {
        type: Boolean,
        default: true
     },

     pages: {
           type: [pageSchema],
           defualt: []
     },

     enableNavigation: {
        type: Boolean,
        default: true
     },

     geminiApiKey: {
        type: String,
        default: ""
     },

     geminiStatus: {
        type: String,
        enum: [
            "active",
            "quota_exceeded",
            "invalid"
        ],
        default: 'active'
     },

     totalMessages: {
        type: Number,
        default: 0
     },

     plan: {
        type: String,
        enum: ["free", "pro"],
        default: "free"
     },

     requestLimit: {
        type: Number,
        default: 200
     },

     proExpiresAt: {
        type: Date,
        default: null
     },

     isSetupComplete: {
        type: Boolean,
        default: false
     }
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User