export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const initialState = {
    token: null,
    userId: null,
    tokenExpiration: null,
}

export const login = (token, userId, expiration) => ({
    type: LOGIN,
    payload: {
        token,
        userId,
    },
})

export const logout = () => ({
    type: LOGOUT,
    payload: {
        token: null,
        userId: null,
    },
})

export const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }

        case LOGOUT:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
            }

        default:
            return state
    }
}
