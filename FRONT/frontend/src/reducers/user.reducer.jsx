import {
  // FOLLOW_USER,
  GET_USER,
  // UNFOLLOW_USER,
  // UPDATE_BIO,
  // UPLOAD_PICTURE,
} from '../actions/user.actions'

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (
    action.type //remplacer switch par routes?
  ) {
    case GET_USER:
      return action.payload

    default:
      return state
  }
}
