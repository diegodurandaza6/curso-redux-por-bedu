import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import * as tareasActions from '../../actions/tareasActions';
import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';

class Guardar extends Component {
	componentDidMount(){
        const {
            match: {
                params: {
                    usu_id, tar_id
                }
            },
            tareas,
            cambioUsuarioId,
            cambioTitulo
        } = this.props;

        if (usu_id && tar_id){
            console.log(tareas)
            const tarea = tareas[usu_id][tar_id];
            cambioUsuarioId(tarea.userId);
            cambioTitulo(tarea.title);
        }
    }
    
    cambioUsuarioId = (event) => {
		this.props.cambioUsuarioId(event.target.value);
	};

	cambioTitulo = (event) => {
		this.props.cambioTitulo(event.target.value);
	};

    guardar = () => {
        const {
            match: {
                params: {
                    usu_id, tar_id
                }
            },
            tareas,
            usuario_id, 
            titulo, 
            agregar,
            editar
        } = this.props;
        const nueva_tarea = {
            userId: usuario_id,
            title: titulo,
            completed: false
        };

        if(usu_id && tar_id){
            const tarea_sel = tareas[usu_id][tar_id];
            const tarea_editada = {
                ...nueva_tarea,
                completed: tarea_sel.completed,
                id: tarea_sel.id
            }

            editar(tarea_editada);
        }else{
            agregar(nueva_tarea);
        }
    }

    deshabilitar = () => {
        const { titulo, usuario_id, cargando } = this.props;

        if (cargando){
            return true;
        }
        else if(!titulo || !usuario_id){
            return true;
        }
        return false;
    }

    mostrarAccion = () => {
        const { cargando, error } = this.props;
        if(error) {
            return <Fatal error={error}/>;
        }

        if(cargando) {
            return <Spinner/>;
        }
        return '';
    }

	render() {
        return (
			<div>
                {(this.props.regresar) && <Redirect to='/tareas'/>}
				<h1>Guardar Tarea</h1>
				Usuario id:
				<input
					type='number'
					value={ this.props.usuario_id }
					onChange={ this.cambioUsuarioId }
				/>
				<br /><br />
				Título:
				<input
					value={ this.props.titulo }
					onChange={ this.cambioTitulo }
				/>
				<br /><br />
				<button
                    onClick={this.guardar}
                    disabled={this.deshabilitar()}
                >
					Guardar
				</button>
                {this.mostrarAccion()}
			</div>
		);
	}
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);