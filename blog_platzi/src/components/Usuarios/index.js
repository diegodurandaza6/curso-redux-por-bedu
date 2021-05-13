import React, {Component} from 'react';
import axios from 'axios';

class Usuarios extends Component {

  constructor() {
    super();
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount(){
    await axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => this.setState({ usuarios: response.data }));    
  }

  ponerFilas = () => (
    this.state.usuarios.map(usr => (
      <tr key={usr.id}>
        <td>{usr.name}</td>
        <td>{usr.email}</td>
        <td>{usr.website}</td>
      </tr>
    ))
  );

  render(){
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

export default Usuarios;
