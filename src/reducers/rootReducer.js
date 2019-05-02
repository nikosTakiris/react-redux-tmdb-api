let initialState = {
  queries:[]
}

export const rootReducer = (state = initialState, action) => {

switch (action.type) {
  case "FETCH_API":
    return {
      ...state,
      queries: action.payload
    }

  case "FETCH_ERROR":
  return {
    ...state,
    queries: action.payload
  }

  default: {
    return {
      ...state
    }
  }
}



      return state;
  }
