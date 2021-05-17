import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: ''
};

const publicacionesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_TODOS:
            return {
                ...state, 
                publicaciones: action.payload,
                cargando: false,
                error: ''
            };
        case CARGANDO:
            return {
                ...state, 
                cargando: true
            };
        case ERROR:
            return {
                ...state, 
                cargando: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export default publicacionesReducer;