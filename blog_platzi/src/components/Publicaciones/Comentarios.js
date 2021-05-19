import React from 'react';
import { connect } from 'react-redux';
import Fatal from '../General/Fatal';
import Spinner from '../General/Spinner';

const Comentarios = (props) => {
    console.log(props);
    if(props.com_error && !props.comentarios) {
        return(<Fatal error={props.com_error}/>);
    }

    if(props.com_cargando) {
        return (
            <Spinner/>
        );
    }
    return (
        <h4>
            <ul>
            {props.comentarios.map(com => (
                <li key={com.id}>
                    <b>
                        <u>
                                {com.email}
                        </u>
                    </b>
                    <br />
                    {com.body}
                </li>
            ))}
            </ul>
        </h4>
    );
};

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios);