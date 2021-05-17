import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Tabla = (props) => {
    const ponerFilas = () => (
        props.usuarios.map((usr, index) => (
            <tr key={usr.id}>
                <td>{usr.name}</td>
                <td>{usr.email}</td>
                <td>{usr.website}</td>
                <td>
                    <Link to={`/publicaciones/${index}`}>
                        <div className="eye-solid icon"></div>
                    </Link>
                </td>
            </tr>
        ))
    );

    return (
        <div>
            <table className="tabla">
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Enlace</th>
                </tr>
                </thead>
                <tbody>
                    {ponerFilas()}
                </tbody>
            </table>    
        </div>
    );
};

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
}

export default connect(mapStateToProps)(Tabla);