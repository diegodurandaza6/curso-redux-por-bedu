import axios from 'axios';
import { 
    TRAER_POR_USUARIO, 
    CARGANDO, 
    ERROR, 
    ACTUALIZAR, 
    COM_CARGANDO, 
    COM_ERROR,
    COM_ACTUALIZAR
} from '../types/publicacionesTypes'

import * as usuariosType from '../types/usuariosTypes';
const { TRAER_TODOS: USUARIOS_TRAER_TODOS } = usuariosType;

export const traerPorUsuario = (key) => async (dispatch, getState) => {
    dispatch({
        type: CARGANDO
    });
    try {
        const { usuarios } = getState().usuariosReducer;
        const userId = usuarios[key].id;
        const { publicaciones } = getState().publicacionesReducer;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)

        const nuevas = response.data.map((publicaciones) => (
            {
                ...publicaciones,
                comentatios: [],
                abierto: false
            }
        ));

        const publicacionesActualizadas = [
            ...publicaciones,
            nuevas
        ]

        dispatch({
            type: TRAER_POR_USUARIO,
            payload: publicacionesActualizadas
        })

        const publicaciones_key = publicacionesActualizadas.length - 1;
        const usuariosActualizados = [...usuarios];
        usuariosActualizados[key] = {
            ...usuarios[key],
            publicaciones_key
        };

        dispatch({
            type: USUARIOS_TRAER_TODOS,
            payload: usuariosActualizados
        });
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: `Publicaciones no disponibles. Error: ${error.message}`
        })
    }
}

export const abrirCerrar = (pub_key, com_key) => (dispatch, getState) => {
	const { publicaciones } = getState().publicacionesReducer;
	const seleccionada = publicaciones[pub_key][com_key];

	const actualizada = {
		...seleccionada,
		abierto: !seleccionada.abierto
	};

	const publicaciones_actualizadas = [...publicaciones];

	publicaciones_actualizadas[pub_key] = [
		...publicaciones[pub_key]
	];
	publicaciones_actualizadas[pub_key][com_key] = actualizada;
	
	dispatch({
		type: ACTUALIZAR,
		payload: publicaciones_actualizadas
	})
};

export const traerComentarios = (pub_key, com_key) => async (dispatch, getState) => {
    dispatch({
        type: COM_CARGANDO
    });
    try {
        const { publicaciones } = getState().publicacionesReducer;
        const seleccionada = publicaciones[pub_key][com_key];

        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };
        const publicaciones_actualizadas = [...publicaciones];

        publicaciones_actualizadas[pub_key] = [
            ...publicaciones[pub_key]
        ];
        publicaciones_actualizadas[pub_key][com_key] = actualizada;
        
        dispatch({
            type: COM_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
    } catch (error) {
        dispatch({
            type: COM_ERROR,
            payload: `Comentarios no disponibles. Error: ${error.message}`
        })
    }
};