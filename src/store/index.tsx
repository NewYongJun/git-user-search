import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";

import { HistoryState, HistoryAction, DispatchType } from "./type/type";

import reducer from "./reducers/reducer";

export const store: Store<HistoryState, HistoryAction> & {
    dispatch: DispatchType
} = createStore(reducer, applyMiddleware(thunk))