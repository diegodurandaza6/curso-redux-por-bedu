import axios from 'axios';
import {
	TRAER_TODAS,
	CARGANDO,
	ERROR,
	CAMBIO_USUARIO,
	CAMBIO_TITULO,
    GUARDAR,
    ACTUALIZAR
} from '../types/tareasTypes';

export const traerTodas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')

        const tareas = {};
		response.data.map((tar) => (
			tareas[tar.userId] = {
				...tareas[tar.userId],
				[tar.id]: {
					...tar
				}
			}
		));

        dispatch({
            type: TRAER_TODAS,
            payload: tareas
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Información de tareas no disponible. Error: ${error.message}`
        })
    }
}

export const cambioUsuarioId = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_USUARIO,
		payload: valor
	})
};

export const cambioTitulo = (valor) => (dispatch) => {
	dispatch({
		type: CAMBIO_TITULO,
		payload: valor
	})
};

export const agregar = (nueva_tarea) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });

    try {
        await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Información de tareas no actualizada. Error: ${error.message}`
        })
    }
}

export const editar = (tarea_editada) => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });

    try {
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
        dispatch({
            type: GUARDAR
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Información de tareas no actualizada. Error: ${error.message}`
        })
    }
};

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
	const { tareas } = getState().tareasReducer;
	const seleccionada = tareas[usu_id][tar_id];

	const actualizadas = {
		...tareas
	};
	actualizadas[usu_id] = {
		...tareas[usu_id]
	};
	actualizadas[usu_id][tar_id] = {
		...tareas[usu_id][tar_id],
		completed: !seleccionada.completed
	}

	dispatch({
		type: ACTUALIZAR,
		payload: actualizadas
	})
};