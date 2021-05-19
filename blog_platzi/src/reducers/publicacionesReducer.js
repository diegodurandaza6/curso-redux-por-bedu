import { 
    TRAER_POR_USUARIO, 
    CARGANDO, 
    ERROR, 
    ACTUALIZAR, 
    COM_CARGANDO, 
    COM_ERROR,
    COM_ACTUALIZAR
} from '../types/publicacionesTypes'

const INITIAL_STATE = {
    publicaciones: [],
    cargando: false,
    error: '',
    com_cargando: false,
    com_error: ''
};

const publicacionesReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_POR_USUARIO:
            return {
                ...state, 
                publicaciones: action.payload,
                cargando: false,
                error: '',
                com_cargando: false,
                com_error: ''
            };
        case ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
                cargando: false,
                error: '',
            };
        case COM_ACTUALIZAR:
            return {
                ...state,
                publicaciones: action.payload,
                com_cargando: false,
                com_error: ''
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
        case COM_CARGANDO:
            return {
                ...state, 
                com_cargando: true
            };
        case COM_ERROR:
            return {
                ...state, 
                com_cargando: false,
                com_error: action.payload
            };
        default:
            return state;
    }
}

export default publicacionesReducer;