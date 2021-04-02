import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import '../../../scss/components/layouts/List.scss';
 
 
class List extends Component {
    constructor(props) {
        super(props) 

        this.state = {
            currentPage: 1,
            entriesStart: 0,
            maxPerPage: 10,
            currentEnd: '',
            searchfield: ''
        }
    }

	componentDidMount() {
		this.setState({currentEnd: this.props.stateObject})
		
	}

	setEntries = (event) => {
		if (event.target.value > 0) {
			this.setState({ maxPerPage: parseInt(event.target.value) })
		}
	}

	setFilter = (event) => {
		this.setState({ searchfield: event.target.value })
	}

	renderPagination = () => {
		let { maxPerPage } = this.state;
		// let pages = this.props.stateObject.length / maxPerPage;
		let pages = this.props.allEntries / maxPerPage;
		let pagesArray = [];

		for (let i=0; i < pages; i++) {
			pagesArray.push(i)
		}

		let pageButtons = pagesArray.map(el => {
			let style;
			if ((el + 1)  === this.state.currentPage) { style = 'page-number page-selected' }
			else { style = 'page-number' }

			return <p className={style} key={el} onClick={() => this.changePage(el)}>{el + 1}</p>
		})

		return pageButtons;
	}

	changePage = (el) => {
		let { maxPerPage } = this.state;
		this.setState({
			entriesStart: el * maxPerPage,
			currentPage: el + 1 
		})
	}

	nextPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart + maxPerPage <= this.props.stateObject.length - 1) {
			this.setState({ 
				entriesStart: currentStart + maxPerPage,
				currentPage: this.state.currentPage + 1 
			})
		} else {
			alert('no more entries')
		}
	}

	previousPage = () => {
		let currentStart = this.state.entriesStart;
		let { maxPerPage } = this.state;

		if (currentStart === 0) return alert('you are at the start')

		if ((currentStart - maxPerPage) < 0) {
			this.setState({ entriesStart: 0 })

		} else if (currentStart !== 0) {
			this.setState({ 
				entriesStart: currentStart - maxPerPage,
				currentPage: this.state.currentPage - 1  
			})
		} 

	}

	calcCurrentEnd = (n) => {
		let { stateObject, allEntries } = this.props;
		let { entriesStart, maxPerPage } = this.state;
		let currEnd;

        if ( maxPerPage > allEntries) {
            currEnd = allEntries
        } else if (entriesStart + maxPerPage <= stateObject.length) {
            currEnd = entriesStart + maxPerPage;
        } else {
            currEnd = stateObject.length;
        }
        return currEnd;

        // function help() {
        //     if (entriesStart + maxPerPage <= stateObject.length) {
        //         currEnd = entriesStart + maxPerPage;
        //     // } else if (entriesStart + maxPerPage <= allEntries) {
        //     //     currEnd = allEntries;
        //     } else {
        //         currEnd = stateObject.length;
        //     }
        //     return currEnd;
        // }

        // let finalNumber = help()
        
        // if (finalNumber > finalNumber) 

	}


	render() {
		let { stateObject } = this.props;
		let { entriesStart, maxPerPage, searchfield } = this.state;

		return (
			<div>
				<main className="list-main">
					<div className="list-container">
						<header className="banner-container">
							<div className="list-banner">
								<p className="list-title">{this.props.listTitle}</p>
								<p className="list-detail">{this.props.listDescription}</p>
							</div>
						</header>
						<div className="list-search">
							<div className="list-entries">
								<div className="entries-show">
									<p>show</p>
									<input 
										type="number" 
										name= "entries" 
										defaultValue={maxPerPage}
										onChange={this.setEntries} 
										className="small-input"
									/>
									<p>entries</p>
								</div>
								<div className="entries-search">
									<p>Search:</p>
									<input type="search" onChange={this.setFilter}/>
								</div>
							</div>
						</div> 
						<div className="list-details-container">
						<main className="tableList-container">
								<header className={this.props.titleGrid}>
									{this.props.children}
								</header>
								<div className="tableList-details-container">
									{this.props.renderItems(entriesStart, maxPerPage, searchfield)}
								</div>
								<div className="tableList-footer">
									<p>Showing {entriesStart + 1} to {this.calcCurrentEnd()} of {this.props.allEntries} entries</p>
									{/* <p>Showing {entriesStart + 1} to {this.calcCurrentEnd()} of {stateObject.length} entries</p> */}
									<div className="tableList-pagination">
										<p onClick={this.previousPage}>Previous</p>
										{this.renderPagination()}
										<p onClick={this.nextPage}>Next</p>
									</div>
								</div>
							</main>
						</div> 
					</div>
				</main>
			</div>
		)
	}
}


export default List; 