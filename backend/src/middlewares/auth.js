import { checkSchema, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

export async function signUpValidation(req, res, next) {
    await checkSchema({
        email: { exists: { errorMessage: "Email is required", bail: true }, isEmail: true },
        password: { exists: { errorMessage: "Password is required", bail: true }, isLength: { options: { min: 5 }, errorMessage: "Password should be atleast 5 characters long" } },
        name: { exists: { errorMessage: "firstName is required", bail: true }, isString: { errorMessage: "firstName should be string" } },
    }).run(req);
    const error = validationResult(req)
    if (!(error.isEmpty())) {
        return res.status(400).json({
            message: error.array()
        })
    }
    next()
}

export async function loginValidation(req, res, next) {
    await checkSchema({
        email: { exists: { errorMessage: "Email is required", bail: true }, isEmail: true },
        password: { exists: { errorMessage: "Password is required", bail: true } }
    }).run(req);
    const error = validationResult(req)
    if (!(error.isEmpty())) {
        return res.status(400).json({
            message: error.array()
        })
    }
    next()
}

export async function hotelValidation(req, res, next) {
    req.body = JSON.parse(req.body.data);
    await checkSchema({
        name: { exists: { errorMessage: "Name is required", bail: true }, isString: { errorMessage: "Name should be string " } },
        city: { exists: { errorMessage: "City is required", bail: true }, isString: { errorMessage: "City should be string " } },
        country: { exists: { errorMessage: "Country is required", bail: true }, isString: { errorMessage: "Country should be string " } },
        description: { exists: { errorMessage: "Description is required", bail: true }, isString: { errorMessage: "Description should be string " } },
        address: { exists: { errorMessage: "Address is required", bail: true }, isString: { errorMessage: "Address should be string " } },
        phoneNumber: { exists: { errorMessage: "Phone Number is required", bail: true }, isNumeric: { errorMessage: "Phone Number should be number " } },
    }, ['body']).run(req);
    const error = validationResult(req)
    if (!(error.isEmpty())) {
        return res.status(400).json({
            message: error.array()
        })
    }
    next()
}
export async function verifyToken(req, res, next) {
    const token = req.cookies['auth-token'];
    console.log(token , "inside token")
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const checkToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = checkToken.userId;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}
