import JWT from 'jsonwebtoken'
import userModel from '../models/user.model.js'

//Protected Routes
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access'
      })
    }
    const decode = JWT.verify(token, process.env.JWT_SECRET)
    req.user = decode
    next()
  } catch (error) {
    console.log(error)
  }
}

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id)
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: 'UnAuthorized Access'
      })
    } else {
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).send({
      success: false,
      error,
      message: 'Error in admin middleware'
    })
  }
}
