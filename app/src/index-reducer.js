import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import signup from './Signup/reducer'
import client from './Client/reducer'
import login from './Login/reducer'
import keywordReducer from './Keyword/reducer'
import userReducer from './Users/reducer'
import { loadingBarReducer } from 'react-redux-loading-bar'

const appReducer = combineReducers({
  /* your app’s top-level reducers */
  form,
  signup,
  client,
  login,
  keywords: keywordReducer,
  loadingBar: loadingBarReducer,
  users:userReducer
})

//https://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store
//退出程序重置state

const IndexReducer = (state, action) => {
  // if (action.type === 'CLIENT_UNSET') {
  //   const { routing } = state
  //   state = { routing } 
  // }
  return appReducer(state, action)
}

export default IndexReducer