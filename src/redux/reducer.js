const initialState = {
    username: '',
    profilePic: ''
}

const UPDATE_USER = 'UPDATE_USER';
const LOGOUT = 'LOGOUT';

export const updateUser = (user) => {
    console.log(user);

    return {
        type: UPDATE_USER,
        payload: user
    }
}

export const logout = () => {
    return {
        type: LOGOUT
    }
}


const reducer = (state = initialState, action) => {
    console.log(action.payload);

    switch(action.type){
        case UPDATE_USER: {
            return {
                ...state,
                username: action.payload.username,
                profilePic: action.payload.profilePic
            }
        }
        case LOGOUT: {
            return {
                username: '',
                profilePic: ''
            }
        }
        default: {
            return state;
        }
    }
}

export default reducer;