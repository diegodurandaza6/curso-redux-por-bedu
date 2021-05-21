import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO,
    GUARDAR,
	ACTUALIZAR
} from '../types/tareasTypes';

const INITIAL_STATE = {
	tareas: {},
	cargando: false,
	error: '',
	usuario_id: '',
	titulo: '',
    regresar: false
};

const tareasReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TRAER_TODAS:
            return {
                ...state, 
                tareas: action.payload,
                cargando: false,
                error: '',
                regresar: false
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
        case CAMBIO_USUARIO:
            return { ...state, usuario_id: action.payload };

        case CAMBIO_TITULO:
            return { ...state, titulo: action.payload };
        case GUARDAR:
            return {
                ...state,
                tareas: {},
                cargando: false,
                error: '',
                regresar: true,
                usuario_id: '',
                titulo: ''
            };
        case ACTUALIZAR:
            return { ...state, tareas: action.payload };
        default:
            return state;
    }
}

export default tareasReducer;