// #region Local Imports
import { ActionConsts } from '@Definitions';
// #endregion Local Imports

// #region Interface Imports
import { NewsAction, NewsState } from '@Interfaces';
// #endregion Interface Imports

const INITIAL_STATE: NewsState = {
  list: [],
  idIndexMap: {},
};

export const NewsReducer = (state = INITIAL_STATE, action: NewsAction) => {
  switch (action.type) {
    case ActionConsts.News.AddNews:
    case ActionConsts.News.UpdateNews: {
      if (!action.news) return state;
      const newsId = action.newsId || action.news.id;
      if (!newsId) return state;

      const newState = { ...state };
      const index = state.idIndexMap[newsId];
      if (index) {
        newState.list[index] = action.news;
        return newState;
      }
      newState.idIndexMap[newsId] = newState.list.length;
      newState.list.push(action.news);
      return newState;
    }
    default:
      return state;
  }
};
