import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import User from '../../models/User'

export const users = async () => {
    try {
        const users = await User.find()
        return users.map((user) => ({
            ...user._doc,
            password: null,
        }))
    } catch (error) {
        throw error
    }
}

export const createUser = async (args) => {
    try {
        const existingUser = await User.findOne({ email: args.userInput.email })
        if (existingUser) {
            throw new Error('Email exists already.')
        }
        const hashedPass = await bcrypt.hash(args.userInput.password, 12)
        const user = new User({
            email: args.userInput.email,
            password: hashedPass,
        })
        const result = await user.save()
        return { ...result._doc, password: null }
    } catch (error) {
        throw error
    }
}

export const login = async ({ email, password }) => {
    const user = await User.findOne({ email: email })
    if (!user) {
        throw new Error('User does not exist!')
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
        throw new Error('Password is incorrect!')
    }
    const token = await JWT.sign(
        { userId: user.id, email: user.email },
        'somesupersecretkey',
        {
            expiresIn: '1h',
        }
    )
    return {
        userId: user.id,
        token: token,
        tokenExpiration: 1,
    }
}
