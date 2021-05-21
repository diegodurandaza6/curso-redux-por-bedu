import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as tareasActions from '../../actions/tareasActions'
import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';
import { Link } from 'react-router-dom';

class Tareas extends Component {
    constructor(){
        super();
        this.contador = 1;
    }

    componentDidMount = () => {
        if(!Object.keys(this.props.tareas).length){
            this.props.traerTodas();
        }
    }

    mostrarContenido = () => {
        const { tareas, cargando, error } = this.props;
        if(error) {
            return <Fatal error={error}/>;
        }

        if(cargando) {
            return <Spinner/>;
        }

        if (tareas) {
            return Object.keys(tareas).map((userId => (
                <div key={userId}>
                    <h2>
                        Usuario {userId}
                    </h2>
                    <div className="contenedor_tareas">
                        { this.ponerTareas(userId) }
                    </div>
                </div>
            )));
        }
    }

    ponerTareas = (userId) => {
        const { tareas, cambioCheck } = this.props;
        const por_usuario = {
            ...tareas[userId]
        };
        return Object.keys(por_usuario).map(task => (
            <div key={`${userId}_${task}`}>
                <label htmlFor={`${userId}_${task}`}>
                    <input 
                        id={`${userId}_${task}`} 
                        type="checkbox" 
                        defaultChecked={por_usuario[task].completed}
                        onChange={() => {cambioCheck(userId, task)}}
                    />
                    {por_usuario[task].title}
                </label>
                <button className="m_left">
                    <Link to={`/tareas/guardar/${userId}/${task}`}>Editar</Link>
                </button>
                <button className="m_left">
                    Eliminar
                </button>
            </div>
        ));
    }

    render() {
        console.log(`Tareas ${this.contador++}`, this.props)
        return (
            <div>
                <button>
					<Link to='/tareas/guardar'>
						Agregar
					</Link>
				</button>
                {this.mostrarContenido()}
            </div>
        );
    }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas);