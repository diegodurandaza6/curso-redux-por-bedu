import React from 'react';
import { connect } from 'react-redux'

import * as usuariosActions from '../../actions/usuariosActions';
import * as publicacionesActions from '../../actions/publicacionesActions';
import Spinner from '../General/Spinner';
import Fatal from '../General/Fatal';

const { traerTodos: usuariosTraerTodos } = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesActions;

class Publicaciones extends React.Component {
    constructor(){
        super();
        this.contador = 1;
    }
    
    async componentDidMount() {
        if(!this.props.usuariosReducer.usuarios.lenght){
            await this.props.usuariosTraerTodos();
        }
        this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
    }

    render() {
        console.log(`Publicaciones ${this.contador++}`, this.props)
        if(this.props.publicacionesReducer.cargando) {
            return (
                <Spinner/>
            );
        }

        if(this.props.publicacionesReducer.error) {
            return(<Fatal error={this.props.error}/>);
        }
        return (
            <div>
                <h1>Publicaciones de</h1>
                {this.props.match.params.key}
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
    publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);