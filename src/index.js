import React from 'react';
import ReactDOM from 'react-dom';



class BookLibrary extends React.Component
{
    constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "",
			books: []
		}

		this.updateBooks = this.updateBooks.bind(this);
		this.updateSelectedLanguage = this.updateSelectedLanguage.bind(this);
	}


	updateBooks(books) {
		this.setState({books: books});
	}                     


	updateSelectedLanguage(newLanguage) {
		this.setState({selectedLanguage: newLanguage});
	}


	render() {
		return (
			<div className="container-fluid">

				<div className="row">

					<div className="col-md-5 offset-md-2">

						<h2>My Library</h2>
						<hr />

						<LanguageSelect books={this.state.books} updateBooks={this.updateBooks} updateSelectedLanguage={this.updateSelectedLanguage} />

						<BookSearchResult books={this.state.books} selectedLanguage={this.state.selectedLanguage} />

					</div>

				</div>

			</div>
		);
	}
}

class LanguageSelect extends React.Component
{
    constructor(props) {
		super(props);

		this.selectChanged = this.selectChanged.bind(this);
	}

	componentDidMount() {
		let self = this;

		let request = new XMLHttpRequest();
		request.open("get", "books.json");
		request.send();
		request.onreadystatechange = function() {
			if(request.readyState == 4 && request.status == 200) {
				let data = JSON.parse(request.responseText);
				self.props.updateBooks(data);
			}
		}
	}

	populateOptions() {
		let books = new Set( this.props.books.map( b => b.language ) );
		let optionElements = [
			<option key={"select"} value="select">Select a Language</option>
		];
		books.forEach( b => optionElements.push( <option key={b} value={b}>{b}</option> ) );
		return optionElements;
	}

	selectChanged(event) {
		this.props.updateSelectedLanguage(event.target.value);
	}

	render() {

		return (
			<select onChange={this.selectChanged} className="form-control">
				{this.populateOptions()}
			</select>
		)
	}

}


class BookSearchResult extends React.Component
{
    populateTableData() {
		let selectedLanguage = this.props.selectedLanguage;
		let books = this.props.books;
		let availableBooks = books.filter(b => b.language == selectedLanguage);

		let tableData = availableBooks.map( b => {
			return (
				<tr key={b.title}>
					<td>{b.title}</td>
					<td>{b.country}</td>
					<td>{b.language}</td>
				</tr>
			);
		});
		return tableData;
	}


	render() {
		return (
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Title</th>
						<th>Country</th>
						<th>Language</th>
					</tr>
				</thead>

				<tbody>
					{this.populateTableData()}
				</tbody>

			</table>
		)
	}
}

ReactDOM.render(<BookLibrary/>,document.getElementById('root'));