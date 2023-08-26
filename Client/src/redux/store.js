// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./reducer.js";
// import thunkMiddleware from "redux-thunk";

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     rootReducer,
//     composeEnhancer(applyMiddleware(thunkMiddleware))
// );

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer.js";
import thunkMiddleware from "redux-thunk";

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
  
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production", 
});

export default store;