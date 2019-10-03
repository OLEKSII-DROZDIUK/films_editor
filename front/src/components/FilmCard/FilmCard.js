import React from 'react';

import idGeneratorHelper from '../../helpers/idGeneratorHelper';

const FilmCard = (props) => {

   return (
        <div key={props.film._id} className="card shadow p-3 mb-5 bg-white rounded m-1 card_film" style={{width:"20rem"}}>
            <div className="card-body d-flex flex-column film">
                <h4 className="card-title text-center film-title">{props.film.title}</h4>
                <h6 className="card-subtitle mb-2 text-warning text-center film-format">{props.film.format}</h6>
                <h6 className="card-subtitle text-secondary film-year">{props.film.year}</h6>
                <p className="film-id">{props.film.myId}</p> 
                <p className="badge badge-info film_actors-name">actors</p>
                <ul className="list-group list-group-flush text-center film_list">
                    {props.film.stars.map(actor => {
                        return(
                            <li key={idGeneratorHelper()} className="list-group-item border border-secondary film_list-item">{actor}</li>
                        )
                    })}
                </ul>
                <button type="button" onClick={(event) => props.film._id?props.deleteFilmAction(props.film._id):null} 
                    className="btn btn-outline-danger btn-xs align-self-center film_btn-del">
                        <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
            </div>
        </div>)
}

export default FilmCard;