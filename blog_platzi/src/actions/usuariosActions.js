import axios from 'axios';
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/usuariosTypes'

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
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