import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionesTypes'

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        dispatch({
            type: TRAER_TODOS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Algo salió mal, intente mas tarde. Error: ${error.message}`
        })
    }
}

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const { usuarios } = getState().usuariosReducer;
        console.log(usuarios);
        const userId = usuarios[key].id;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        dispatch({
            type: TRAER_TODOS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Algo salió mal, intente mas tarde. Error: ${error.message}`
        })
    }
}