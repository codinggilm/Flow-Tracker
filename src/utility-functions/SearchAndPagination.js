export const setEntries = (event) => {
    if (event.target.value > 0) {
        this.setState({ maxPerPage: parseInt(event.target.value) })
    }
}

export const setFilter = (event) => {
    this.setState({ searchfield: event.target.value })
}

export const renderPagination = (stateObject) => {
    let { maxPerPage } = this.state;
    let pages = stateObject.length / maxPerPage;
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

export const changePage = (el) => {
    let { maxPerPage } = this.state;
    this.setState({
        entriesStart: el * maxPerPage,
        currentPage: el + 1 
    })
}

export const nextPage = (stateObject) => {
    let currentStart = this.state.entriesStart;
    let { maxPerPage } = this.state;

    if (currentStart + maxPerPage <= stateObject.length - 1) {
        this.setState({ 
            entriesStart: currentStart + maxPerPage,
            currentPage: this.state.currentPage + 1 
        })
    } else {
        alert('no more entries')
    }
}

export const previousPage = () => {
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

export const calcCurrentEnd = (stateObject) => {
    let { entriesStart, maxPerPage } = this.state;
    let end;

    if (entriesStart + maxPerPage <= stateObject.length) {
        end = entriesStart + maxPerPage;
    } else {
        end = stateObject.length;
    }
    return end;
}


// export const renderProjects = () => {
//     let { projects } = this.props;
//     let { maxPerPage, entriesStart } = this.state;
//     let entriesEnd = entriesStart + maxPerPage;
//     let filter = this.state.searchfield;

//     let filteredList = projects.filter(projects => {
//         return projects.title.toLowerCase().includes(filter) || projects.description.toLowerCase().includes(filter)
//     })

//     return filteredList.slice(entriesStart, entriesEnd).map(project => {
//         return (
//             <div className="tableList-row" key={project.id}>
//                 <p>{project.title}</p>
//                 <p>{project.description}</p>
//                 <div className="project-action-buttons">
//                     <Link to="/projectassign">Manage Users</Link>
//                     <Link to="/projectdetails" onClick={ ()=>this.props.saveProjectId(project.id) }>
//                         Project details
//                     </Link>
//                 </div>
//             </div>
//         )
//     })
// }
