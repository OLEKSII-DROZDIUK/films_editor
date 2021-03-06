import React from 'react';


const AddFilm = (props) => {
   
   return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body film-add">
                    <div className="form-group film-add_title">
                        <label htmlFor="form-control">Film name</label>
                        <input type="text" name="title" className="form-control" id="title" placeholder="Star Wars: Episode I – The Phantom Menace"
                        onChange={(event) => {props.handleChangeNewFilm(event)}}
                        />
                        {props.validation?<span className="help-block text-danger">{props.validation.title.message}</span>:null}
                    </div>
                    <div className="form-group film-add_year">
                        <label htmlFor="form-control">Release date</label>
                        <input type="text" name="year" className="form-control" placeholder="1999" id="year"
                        onChange={(event) => {props.handleChangeNewFilm(event)}}
                        />
                        {props.validation?<span className="help-block text-danger">{props.validation.year.message}</span>:null}
                    </div>
                    <div className="form-group film-add_format">
                        <label htmlFor="format">Film format</label>
                        <select className="form-control" name="format" 
                        onChange={(event) => {props.handleChangeNewFilm(event)}}>
                            <option>DVD</option>
                            <option>VHS</option>
                            <option>Blu-Ray</option>
                        </select>
                    </div>
                    <div className="form-group film-add_stars" id="film-add_stars">
                        <label htmlFor="star">Actors</label>
                        <button className="btn stars_new" 
                            onClick={(event) => props.handleAddStar(event)}>
                                <i className="fas fa-user-plus"></i>
                        </button>
                        <input type="text" name="star" className="form-control stars-name" id="star" placeholder="Frank Oz"
                            onChange={(event) => {props.handleChangeNewFilm(event)}}/>
                        {props.validation?<span className="help-block text-danger">{props.validation.star.message}</span>:null}
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close window</button>
                    <button type="button" className="btn btn-primary" 
                    onClick={(event) => props.handleAddNewFilm(event)}
                    data-dismiss={props.validation?props.validation.isValid?"modal":"none":null}>Add new film</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddFilm;