import { hashPassword, comparePassword } from '../helper/authHelper.js'
import userModel from '../models/user.model.js'
import JWT from 'jsonwebtoken'

export const registerContoller = async (req, res) => {
  try {
    const { name, email, password, birthday } = req.body
    if (!name) {
      return res.send({ error: 'Name is required' })
    }
    if (!email) {
      return res.send({ error: 'Email is required' })
    }
    if (!password) {
      return res.send({ error: 'Password is required' })
    }

    //checking existing user
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res
        .status(200)
        .send({ success: false, message: 'User already exists,please login' })
    }

    //register user
    const hashedPassword = await hashPassword(password)

    //save user in db
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
      birthday
    }).save()

    res.status(201).send({
      success: true,
      message: 'User registered successfully',
      user
    })
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .send({ success: false, message: 'Error in registration', error: err })
  }
}

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res
        .status(404)
        .send({ success: false, message: 'Email or password is required' })
    }
    //check if user registered or not
    const user = await userModel.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: 'User does not exist' })
    }

    //check if password is correct or not
    const isMatch = await comparePassword(password, user.password)
    if (!isMatch) {
      return res
        .status(200)
        .send({ success: false, message: 'Incorrect password' })
    }
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    })

    return res.status(200).cookie('token', token,
      { httpOnly: true, secure: true }).send({
        success: true,
        message: 'User logged in successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          role: user.role
        },
        token
      })
  } catch (err) {
    console.log(err)
    res.status(500).send({ success: false, message: 'Error in login', err })
  }
}
