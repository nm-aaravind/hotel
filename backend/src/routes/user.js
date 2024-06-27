import express from 'express'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import { signUpValidation, loginValidation, verifyToken } from '../middlewares/auth.js';
import passport from 'passport';
import "../utils/passport.js"
import bcrypt from 'bcryptjs'
import Traveller from '../models/travellers.js';
const router = express.Router();

router.post('/register', signUpValidation, async (req, res) => {
    try {
        let user = await User.findOne({
            email: req.body.email
        })
        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        user = new User({
            ...req.body,
            oAuth: 'local'
        })
        await user.save()

        const token = jwt.sign({
            userId: user.id,
        },
            process.env.JWT_KEY,
            {
                expiresIn: '1d'
            })
        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 86400000
        })
        return res.status(200).json({
            message: "Logged In"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Something went wrong"
        })
    }
})

router.post('/login', loginValidation, async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }

        const pwCheck = await bcrypt.compare(password, user.password);

        if (!pwCheck) {
            return res.status(400).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({
            userId: user.id
        }, process.env.JWT_KEY, {
            expiresIn: "1d"
        });
        res.cookie("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "none",
            maxAge: 86400000
        })
        return res.status(200).json({
            userId: user.id,
            message: "Signed in"
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
})

router.get('/validateToken', verifyToken, async (req, res) => {
    return res.status(200).json({
        message: "Verified token"
    })
})

router.post('/logout', async (req, res) => {
    res.clearCookie('auth-token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
    })
    return res.status(200).json({
        message: "Signed out"
    });
})

router.get("/google", passport.authenticate("google", {
    // scope: [
    //     'https://www.googleapis.com/auth/userinfo.profile',
    //     'https://www.googleapis.com/auth/userinfo.email'
    // ]
    scope: ['email', 'profile']
}))

router.get("/details", verifyToken, async (req, res) => {
    try {
        const token = req.cookies['auth-token'];
        const { userId } = jwt.decode(token)
        const user = await User.findById(userId).select("-password");
        return res.status(200).json({
            data: user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
})

router.patch("/update", verifyToken, async (req, res) => {
    try {
        const token = req.cookies['auth-token'];
        const { userId } = jwt.decode(token)
        const user = await User.findByIdAndUpdate(userId, req.body, { new: true });
        return res.status(200).json({
            message: "Updated successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
})

router.patch("/update/password", verifyToken, async (req, res) => {
    try {
        const token = req.cookies['auth-token'];
        const { userId } = jwt.decode(token)
        const user = await User.findById(userId);

        const pwCheck = await bcrypt.compare(req.body.currentPassword, user.password);

        console.log("Not matching")
        if (!pwCheck) {
            return res.status(400).json({
                message: "Invalid credential"
            })
        }

        const newPassword = await bcrypt.hash(req.body.newPassword, 8)

        const updatedPassword = await User.findByIdAndUpdate(userId, {
            password: newPassword
        })

        return res.status(200).json({
            message: "Success"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "Something went wrong"
        })
    }
})

router.get("/google/redirect",passport.authenticate("google",{
    session: false,
    scope : ['email', 'profile']
}), (req, res) => {
    const token = jwt.sign({
        userId: req.user.id,
    },
        process.env.JWT_KEY,
        {
            expiresIn: '1d'
        })
    res.cookie("auth-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        maxAge: 86400000
    })
    return res.send("<script>window.close();</script>")
})

router.post("/add-travellers", verifyToken, async (req, res) => {
    try {
        const token = req.cookies['auth-token'];
        const { userId } = jwt.decode(token)

        const travellers = req.body.map((traveller) => {
            return {
                linked: userId,
                ...traveller
            }
        })

        const result = await Traveller.insertMany(travellers);

        return res.status(200).json({
            message: "Travellers added"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "something went wrong"
        })
    }
})

router.get("/travellers", verifyToken, async (req, res) => {
    try {
        const token = req.cookies['auth-token'];
        const { userId } = jwt.decode(token)

        const result = await Traveller.find({
            linked: userId
        })

        return res.status(200).json({
           data: result
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: "something went wrong"
        })
    }
})

router.delete("/travellers/delete", verifyToken, async (req, res) => {
    try {
        const { travellerId } = req.query
        const response = await Traveller.findByIdAndDelete(travellerId)
        if(!response){
            throw Error("Cannot delete hotel")
        }
        return res.status(200).json({
            message: "Deleted traveller"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"Something went wrong"
        })
    }
})

export default router;