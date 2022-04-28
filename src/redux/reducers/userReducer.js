import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  THUMBSUP_POST,
  REMOVETHUMBSUP_POST,
  MARK_NOTIFICATIONS_READ
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  // credentials: {},
portfolio:"",
createdAt:"",
email:"",
username:"",
imageUrl:"",
aboutYou:"",
location:"",
userId:"",
  thumbsUps: [],
  notifications: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case THUMBSUP_POST:
      return {
        ...state,
        thumbsUps: [
          ...state.thumbsUps,
          {
            username: state.username,
            postId: action.payload.postId
          }
        ]
      };
    case REMOVETHUMBSUP_POST:
      return {
        ...state,
        thumbsUps: state.thumbsUps.filter(
          (thumbsup) => thumbsup.postId !== action.payload.postId
        )
      };
    case MARK_NOTIFICATIONS_READ:
      state.notifications.forEach((not) => (not.read = true));
      return {
        ...state
      };
    default:
      return state;
  }
}
