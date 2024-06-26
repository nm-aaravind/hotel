import passport from "passport";
import { Strategy } from "passport-google-oauth20"
import User from "../models/user.js";
import dotenv from 'dotenv'
dotenv.config()
export default passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/api/users/google/redirect", 
    }, async (accessToken, refreshToken, profile, callback) => {
        let user = await User.findOne({
            googleId: profile.id,
            oAuth: 'oauth'
        })
        if(!user){
            user = await User.create({
                email: profile._json.email,
                name: profile._json.name,
                oAuth: 'oauth',
                googleId: profile.id
            })
        }
        callback(null, user);
    })    
)