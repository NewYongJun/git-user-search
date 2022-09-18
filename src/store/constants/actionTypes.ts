import { HistoryState } from "../type/type"

export const SEARCH_HISTORY = "SEARCH_HISTORY"

export const initialState: HistoryState = {
    history: [ ],
    searchName: ''
  }