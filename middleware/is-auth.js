import JWT from 'jsonwebtoken'

export const isAuthenticate = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false
        return next()
    }
    const token = authHeader.split(' ')[1]
    if (!token || token === '') {
        req.isAuth = false
        return next()
    }
    let decodedToken
    try {
        decodedToken = JWT.verify(token, 'somesupersecretkey')
    } catch (error) {
        req.isAuth = false
        return next()
    }
    if (!decodedToken) {
        req.isAuth = false
        return next()
    }
    req.isAuth = true
    req.userId = decodedToken.userId
    next()
}
