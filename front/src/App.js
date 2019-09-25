import React, {Component} from 'react';
import Files from "react-files";
import {connect} from 'react-redux';

import {getAllFilms, loadNewFilms, deleteFilm, addFilm, sortByName} from "./actions/action";
import idGeneratorHelper from './helpers/idGeneratorHelper';
import filterFilmsHelper from './helpers/filterFilmsHelper';
import './App.css';


class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			title:'',
			year:'',
			format:'DVD',
			filterTitle:'',
			filterStarName:''
		}

		this.fileReader = new FileReader();
		this.fileReader.onload = event => {

			const lines = event.target.result.split('\n')
			const objects = []
			const filteredLines = lines.filter(line => line.length > 1)

			for(let i = 0; i < filteredLines.length; i = i + 4) {
				objects.push({
					title: filteredLines[i].split(':')[1].trim(),
					year: filteredLines[i+1].split(':')[1].trim(),
					format: filteredLines[i+2].split(':')[1].trim(),
					stars: filteredLines[i+3].split(':')[1].trim().split(','),
					myId: idGeneratorHelper()
				})
			}
			this.props.loadNewFilmsAction(objects)
		};
	}

    delProductHandler(event, id){
		event.preventDefault()

        if(id){
			this.props.deleteFilmAction(id)
        }
	}
	
	handleAddStar(event){
		event.preventDefault();
		const modalStars = document.getElementById("film-add_stars");

		const input = document.createElement("input");
			input.className = "form-control stars-name";
			input.name = "star";
			input.type="text";
			input.placeholder="Frank Oz";

		modalStars.appendChild(input)
	}

	handleChangeNewFilm(event){
		
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	handleAddNewFilm(event){
		event.preventDefault();

		const collectionOfStars = document.getElementsByClassName("stars-name");
		const stars = [];
		for (let i = 0; i < collectionOfStars.length; i++) {
			if(collectionOfStars[i].value.length >0){
				stars.push(collectionOfStars[i].value)
			}
		}
		this.props.addFilmAction({myId:idGeneratorHelper(), stars, title:this.state.title, year:this.state.year, format:this.state.format})
	}

	handleSortByName(event){
		event.preventDefault();
		this.props.sortByNameAction();
	}

	handleFilterFilms(event){
		
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	componentDidMount(){
		this.props.getAllFilmsAction()
	}

	render(){
		const {films} = this.props;

		const allFilms = films.map(film => {
			if(filterFilmsHelper(film, this.state)){
				return(
					<div key={film._id} className="card shadow p-3 mb-5 bg-white rounded m-1 card_film" style={{width:"20rem"}}>
						<div className="card-body d-flex flex-column film">
							<h4 className="card-title text-center film-title">{film.title}</h4>
							<h6 className="card-subtitle mb-2 text-warning text-center film-format">{film.format}</h6>
							<h6 className="card-subtitle text-secondary film-year">{film.year}</h6>
							<p className="film-id">{film.myId}</p> 
							<p className="badge badge-info film_actors-name">actors</p>
							<ul className="list-group list-group-flush text-center film_list">
								{film.stars.map(actor => {
									return(
										<li key={idGeneratorHelper()} className="list-group-item border border-secondary film_list-item">{actor}</li>
									)
								})}
							</ul>
							<button type="button" onClick={(event) => this.delProductHandler(event, film._id)} className="btn btn-outline-danger btn-xs align-self-center film_btn-del">
								<i className="fa fa-trash" aria-hidden="true"></i>
							</button>
						</div>
					</div>
				)
			}
		})

		return (
			<div className="d-flex flex-column film-gallery">
				<Files
					className="files-loader bg-secondary text-light"
					onChange={file => {
						this.fileReader.readAsText(file[0]);
					}}
					onError={err => console.log(err)}
					accepts={[".txt"]}
					multiple
					maxFiles={1}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>Click or drag file here for load .txt</Files>
				<button type="button" className="btn btn-primary add-film" data-toggle="modal" data-target="#exampleModal">
					<i className="fas fa-film"></i><br></br>Add new film
				</button>
				<button type="button" className="btn btn-dark sort-title" onClick={this.handleSortByName.bind(this)}>
					<i className="fas fa-sort-up"></i><br></br>Sort<br></br>by<br></br>name
				</button>
				<div className="form-group w-50 film-gallery_filters d-flex flex-column">
					<label htmlFor="find-title">Filtred by film name</label>
					<input className="form-control find-title" name="filterTitle" type="text" placeholder="Kin-dza-dza" onChange={this.handleFilterFilms.bind(this)}/>
					<label htmlFor="find-star">Filtred by actor</label>
					<input className="form-control find-star" name="filterStarName" type="text" placeholder="Arnold Schwarzenegger" onChange={this.handleFilterFilms.bind(this)}/>
				</div>
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
								<input type="text" name="title" className="form-control" placeholder="Star Wars: Episode I – The Phantom Menace"
								onChange={this.handleChangeNewFilm.bind(this)}/>
							</div>
							<div className="form-group film-add_year">
								<label htmlFor="form-control">Release date</label>
								<input type="text" name="year" className="form-control" placeholder="1999"
								onChange={this.handleChangeNewFilm.bind(this)}/>
							</div>
							<div className="form-group film-add_format">
								<label htmlFor="format">Film format</label>
								<select className="form-control" name="format" onChange={this.handleChangeNewFilm.bind(this)}>
									<option>DVD</option>
									<option>VHS</option>
									<option>Blu-Ray</option>
								</select>
							</div>
							<div className="form-group film-add_stars" id="film-add_stars">
								<label htmlFor="star">Actors</label>
								<button className="btn stars_new" onClick={this.handleAddStar.bind(this)}>
									<i className="fas fa-user-plus"></i>
								</button>
								<input type="text" name="star" className="form-control stars-name" placeholder="Frank Oz"/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">Close window</button>
							<button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.handleAddNewFilm.bind(this)}>Add new film</button>
						</div>
						</div>
					</div>
				</div>
				<div className="movie-card d-flex flex-wrap justify-content-center">
					{allFilms}
				</div>	
			</div>
		);
	}
}

const mapStateToProps = function (store) {
    return {
		films:store.films.films
    }

};
const mapDispatchToProps = function (dispatch) {
    return {
		getAllFilmsAction:() => dispatch(getAllFilms()),
		loadNewFilmsAction:(films) => dispatch(loadNewFilms(films)),
		deleteFilmAction:(id) => dispatch(deleteFilm(id)),
		addFilmAction:(film) => dispatch(addFilm(film)),
		sortByNameAction:() => dispatch(sortByName()),
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
