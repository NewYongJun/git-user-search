import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import {GitUserType} from '../../type/type'

  type HistoryState = {
    history: GitUserType[]
    searchName: string
  }
  
  type HistoryAction = {
    type: string
    history: GitUserType
    searchName: string
  }
  
  type DispatchType = (args: HistoryAction) => HistoryAction


  type AppDispatch = ThunkDispatch<HistoryState, any, AnyAction>; 