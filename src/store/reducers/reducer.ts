import { GitUserType } from "../../type/type"
import * as actionTypes from "../constants/actionTypes"
import { initialState } from "../constants/actionTypes"

import { HistoryState, HistoryAction } from "../type/type"

const reducer = (
    state: HistoryState = initialState,
    action: HistoryAction
  ): HistoryState => {
    switch (action.type) {
      case actionTypes.SEARCH_HISTORY:
        const history: GitUserType = action.history;
        const searchName: string = action.searchName;

        let userIds: any = {};        
        let save_data = [history, ...state.history].reduce((items:any, item:GitUserType)=>{
          if(!userIds[item.id]){
            userIds[item.id] = true;
            return [...items, item];
          } else return items;
        }, []);

        return {
          ...state,
          history: save_data,
          searchName: searchName
        }
    }
    return state
  }
  
  export default reducer