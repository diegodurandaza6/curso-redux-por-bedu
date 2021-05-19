import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions';

import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';
import Tabla from './Tabla';

class Usuarios extends Component {

  constructor(){
    super();
    this.contador = 1;
  }

  componentDidMount(){
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }    
  }
  
  render(){
    console.log(`Usuarios ${this.contador++}`, this.props)
    if(this.props.cargando) {
      return (
        <Spinner/>
      );
    }

    if(this.props.error) {
      return(<Fatal error={this.props.error}/>);
    }

    return (
        <Tabla usuarios={this.props.usuarios}/>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
