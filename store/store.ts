import thunkMiddleware from "redux-thunk";
import Auth from "./slices/auth-slice";
import Doctor from "./slices/doctor-slice";
import Patient from "./slices/patient-slice";
import Info from "./slices/info-slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        Doctor: Doctor,
        Patient: Patient,
        Info: Info,
        Auth: Auth,
    }, middleware: [thunkMiddleware],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));

export default store;
