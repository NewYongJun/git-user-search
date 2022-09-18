import * as actionTypes from "../constants/actionTypes"

import { HistoryAction, DispatchType } from "../type/type"
import { GitUserType } from "../../type/type"

export function SaveHistory(history: GitUserType, name: string) {
  const action: HistoryAction = {
    type: actionTypes.SEARCH_HISTORY,
    history: history,
    searchName: name
  }

  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: HistoryAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}