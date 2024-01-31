// Conetext API 

// conetxt creation
// Provider
// useContext hook 


import { createContext, useContext, useReducer, useEffect } from 'react';
import reducer from "./reducer"

let API = `https://hn.algolia.com/api/v1/search?`;

const initialState = {
    isLoading : true,
    query: "HTML",
    nbPages: 0,
    page: 0,
    hits : []
}

const AppContext = createContext();

const AppProvider = ({ children }) => {

    // const [state, setState] = useState(initialState);
    const [state, dispatch] = useReducer(reducer, initialState);

    // let isLoading = true;
    // const [isLoading, setIsLoading] = useState(true);


    const fetchApiData = async (url) => {

        dispatch({ type: "SET_ISLOADING" });
        try {
            const res = await fetch(url);
            const data = res.json();
            console.log("this is complete data",data);
            console.log("this is complete data",data.hits);
            // setIsLoading(false);
            dispatch({
                type: "GET_STORIES",
                payload:{
                    hits: data.hits,
                    nbPages: data.nbPages,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }



    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`);
    },[])

    return (
        <AppContext.Provider value={{...state}}>
            {children}
        </AppContext.Provider>
    )
};

// custom hook creation
const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider, useGlobalContext };