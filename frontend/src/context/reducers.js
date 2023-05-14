import { CLEAR_TITLE_QUESTION, EXAM_TITLE, GET_EXAM_LIST, REGISTER_SET_EXAMS } from "./action"

const reducer = (state, action) => {

    if (action.type === CLEAR_TITLE_QUESTION) {
        return {
            ...state, examTitle: "", questions: []
        }
    }
    if (action.type === EXAM_TITLE) {
        return { ...state, examTitle: action.payload.examTitle }
    }



    if (action.type === REGISTER_SET_EXAMS) {
        console.log(action.payload);
        return {
            ...state,
            questions: [...state.questions, action.payload.questions]

        }

    }

    if (action.type === GET_EXAM_LIST) {
        return { ...state, examList: [ ...action.payload.data] }
    }


}

export default reducer