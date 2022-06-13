import { configureStore } from '@reduxjs/toolkit';
// import AuthReducer from './features/authSlice';
// import TourReducer from './features/tourSlice';
import AuthReducer from './Features/AuthSlice';
import CartSlice from './Features/CartSlice';
import TourReducer from './Features/TourSlice';

export default configureStore({
  reducer: {
    auth: AuthReducer,
    tour: TourReducer,
    cart: CartSlice,
  },
});
