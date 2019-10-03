import React, {Component} from 'react';
import Files from "react-files";
import {connect} from 'react-redux';

import FileLoadError from './components/FileLoadError/FileLoadError';
import FilmCard from './components/FilmCard/FilmCard';
import AddFilm from './components/AddFilm/AddFilm';

import FormValidator from './modules/formValidator';
import formRules from './modules/formValidationRules';

import {getAllFilms, loadNewFilms, deleteFilm, addFilm, sortByName} from "./actions/action";
import idGeneratorHelper from './helpers/idGeneratorHelper';
import filterFilmsHelper from './helpers/filterFilmsHelper';
import parseFileHelper from './helpers/parseFileHelper';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);

		this.validator = new FormValidator(formRules);

		this.state = {
			title:'',
			year:'',
			star:'',
			format:'DVD',
			filterTitle:'',
			filterStarName:'',
			hasError: false 
		}

		this.fileReader = new FileReader();
		this.fileReader.onload = this.onLoadFile.bind(this);
	}

	onLoadFile(event){
		try{
			const lines = event.target.result.split('\n')
			
			this.props.loadNewFilmsAction(parseFileHelper(lines))

		} catch(error){
			this.setState({
				hasError:true
			})
		}
			
	};
	
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

		const validation = this.validator.validate(this.state);
        this.setState({ validation });
        this.submitted = true;
		
		if (validation.isValid) {	

			for (let i = 0; i < collectionOfStars.length; i++) {
				if(collectionOfStars[i].value.length >0){
					stars.push(collectionOfStars[i].value)
				}
			}
		this.props.addFilmAction({myId:idGeneratorHelper(), stars, title:this.state.title, year:this.state.year, format:this.state.format})

			document.getElementById("star").value= '';
			document.getElementById("year").value= '';
			document.getElementById("title").value= '';
			this.setState({
				title:'',
				year:'',
				star:'',
			})
		}
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

	onFilesError(event) {
		this.setState({
			hasError:true
		})
	}

	render(){
		const {films} = this.props;

		let validation = this.submitted?            // if the form has been submitted at least once
		this.validator.validate(this.state) :   // then check validity every time we render
		this.state.validation                   // otherwise just use what's in state

		if (this.state.hasError) {
			return <FileLoadError></FileLoadError>
		}

		const allFilms = films.map(film => {
			if(filterFilmsHelper(film, this.state)){
				return(
					<FilmCard key={film._id} film={film} deleteFilmAction={this.props.deleteFilmAction}></FilmCard>
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
					onError={this.onFilesError.bind(this)}
					accepts={[".txt"]}
					multiple
					maxFiles={1}
					maxFileSize={10000000}
					minFileSize={0}
					clickable
				>Click or drag file here for load .txt</Files>
				<button type="button" className="btn btn-dark add-film" data-toggle="modal" data-target="#exampleModal">
					<i className="fas fa-film"></i><br></br>Add new film
				</button>
				<button type="button" className="btn btn-dark sort-title" onClick={this.handleSortByName.bind(this)}>
					<i className="fas fa-sort-up"></i>Sort by name
				</button>
				<div className="form-group w-50 film-gallery_filters d-flex flex-column">
					<label htmlFor="find-title">Filtred by film name</label>
					<input className="form-control find-title" name="filterTitle" type="text" placeholder="Kin-dza-dza" onChange={this.handleFilterFilms.bind(this)}/>
					<label htmlFor="find-star">Filtred by actor</label>
					<input className="form-control find-star" name="filterStarName" type="text" placeholder="Arnold Schwarzenegger" onChange={this.handleFilterFilms.bind(this)}/>
				</div>
					<AddFilm 
						handleChangeNewFilm={(event) => this.handleChangeNewFilm(event)} 
						handleAddStar={(event) => this.handleAddStar(event)}
						handleAddNewFilm={event => this.handleAddNewFilm(event)} validation={validation}>
					</AddFilm>
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
