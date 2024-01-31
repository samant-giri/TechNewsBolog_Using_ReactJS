
const reducer = (state,action) => {
  
    switch (action.type) {
        
        case "SET_ISLOADING":
            return {
                ...state,
                isLoading: true,
            }
        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: [{title:"This is all about HTML"}],
                // nbPages: action.payload.nbPages,
            }
            
        
        default:
            break;
    }

    return state;
}

export default reducer