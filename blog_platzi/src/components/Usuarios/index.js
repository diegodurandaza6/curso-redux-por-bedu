import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as usuariosActions from '../../actions/usuariosActions'

class Usuarios extends Component {

  constructor(){
    super();
    this.contador = 1;
  }

  componentDidMount(){
    this.props.traerTodos();    
  }

  ponerFilas = () => (
    this.props.usuarios.map(usr => (
      <tr key={usr.id}>
        <td>{usr.name}</td>
        <td>{usr.email}</td>
        <td>{usr.website}</td>
      </tr>
    ))
  );
  
  render(){
    console.log(this.contador++, this.props)
    return (
        <table className="tabla">
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Enlace</th>
            </tr>
            </thead>
            <tbody>
            {this.ponerFilas()}
            </tbody>
        </table>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);
