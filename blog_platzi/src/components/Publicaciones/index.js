import React from 'react';
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';
import Comentarios from './Comentarios'

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { 
    traerPorUsuario: publicacionesTraerPorUsuario, 
    abrirCerrar: publicacionesAbrirCerrar,
    traerComentarios 
} = publicacionesActions;

class Publicaciones extends React.Component {
    constructor(){
        super();
        this.contador = 1;
    }
    
    async componentDidMount() {
        const {
            usuariosTraerTodos,
            publicacionesTraerPorUsuario,
            match: { params: { key } }
        } = this.props;

        if(!this.props.usuariosReducer.usuarios.length){
            await usuariosTraerTodos();
        }
        if(this.props.usuariosReducer.error){
            return;
        }
        if(!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            publicacionesTraerPorUsuario(key);
        }
    }

    ponerUsuario = () => {
        const {
            usuariosReducer,
            match: { params: { key } }
        } = this.props;

        if(usuariosReducer.error) {
            return(<Fatal error={usuariosReducer.error}/>);
        }

        if(!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return (
                <Spinner/>
            );
        }

        return(<h1>Publicaciones de {usuariosReducer.usuarios[key].name}</h1>)
    }

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: { usuarios },
            publicacionesReducer,
            publicacionesReducer: { publicaciones },
            match: { params: { key } }
        } = this.props;

        if(!usuarios.length) {
            return;
        }

        if(usuariosReducer.error) {
            return;
        }
        
        if(publicacionesReducer.error) {
            return(<Fatal error={this.props.publicacionesReducer.error}/>);
        }

        if(publicacionesReducer.cargando) {
            return (
                <Spinner/>
            );
        }

        if(!publicaciones.length) {
            return;
        }
    
        if(!('publicaciones_key' in usuarios[key])){
            return;
        }
        const { publicaciones_key } = usuarios[key];
        return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key);
    };

    mostrarInfo = (publicaciones, pub_key) => (
        publicaciones.map((publicacion, com_key) => (
                <div key={publicacion.id} 
                    className="pub_titulo"
                    onClick={() => this.mostrarComentarios(pub_key, com_key, publicacion.comentarios)}
                    >
                    <h2>{publicacion.title}</h2>
                    <h3>{publicacion.body}</h3>
                    <div>{publicacion.abierto ? <Comentarios comentarios={publicacion.comentarios}/> : ''}</div>
                </div>
            )
        )
    );

    mostrarComentarios = (pub_key, com_key, comentarios) => {
        this.props.publicacionesAbrirCerrar(pub_key, com_key)
		if (!comentarios) {
			this.props.traerComentarios(pub_key, com_key)
		}
	};

    render() {
        console.log(`Publicaciones ${this.contador++}`, this.props)
        
        return (
            <div>
                {this.ponerUsuario()}
                {this.ponerPublicaciones()}
            </div>
        );
    }
};

const mapStateToProps = (reducers) => {
    return {
        usuariosReducer: reducers.usuariosReducer,
        publicacionesReducer: reducers.publicacionesReducer
    };
}

const mapDispatchToProps = {
    usuariosTraerTodos,
    publicacionesTraerPorUsuario,
    publicacionesAbrirCerrar,
    traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);