import React, { useContext, useReducer } from "react"
import reducer from "./reducers";
import axios from 'axios';
import { CLEAR_TITLE_QUESTION, EXAM_TITLE, GET_EXAM_LIST, REGISTER_SET_EXAMS } from "./action";

export const intialState = {
    isLoading: false,
    showAlert: false,
    examTitle: "",
    questions: [],
    examList:[]


}

const  Appcontext = React.createContext();
const AppProvider = ({ children})=>{
    const [state, dispatch] = useReducer(reducer,intialState)

    const setTitle = (examTitle) => {
        dispatch({type:EXAM_TITLE,payload:{examTitle}})
    }

    const setExam=( questions) => {
        dispatch({type:REGISTER_SET_EXAMS,payload:{questions}})
    }

    const CreateExam = async () =>{
        try {
            const {questions,examTitle} = state;  
            
            const { data } = await axios.post('http://localhost:4000/api/v1/exams', {
                examTitle,
             questions:[...questions]
            });

          const clear =  dispatch({type:CLEAR_TITLE_QUESTION});
      
           
          } catch (error) {
            console.log(error);
      
          }

    }

    const getExam = async ()=> {
        const {data} =  await axios.get('http://localhost:4000/api/v1/exams');
        console.log(data);
        dispatch({type:GET_EXAM_LIST,payload:{data}})

    }






    return (
        <Appcontext.Provider value={{...state,setExam,setTitle,CreateExam,getExam}}>
            {children}

        </Appcontext.Provider>
    )

}

export const useAppContext = ()=>{
    return useContext(Appcontext)
}

export {AppProvider}