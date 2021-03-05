import React from 'react';
// import TableList from './TableList';
import '../../scss/components/lists/ProjectsList.scss';


const ProjectsList = () => {
	return (
		<div>
			<main className="list-main-projects">
				<div className="list-container">
					<header className="banner-container">
						<div className="list-banner">
							<p className="list-title">Your Projects</p>
							<p className="list-detail">All the projects you have in the database.</p>
						</div>
					</header>
					<div className="list-search">
						<div className="list-entries">
							<div className="entries-show">
								<p>show</p>
								<input type="number" defaultValue="10" className="small-input"/>
								<p>entries</p>
							</div>
							<div className="entries-search">
								<p>Search:</p>
								<input type="search"/>
							</div>
						</div>
					</div>
					<div className="list-details-container">
					<main className="tableList-container">
							<header className="tableList-titles">
								<p>Project Name</p>
								<p>Description</p>
								<p>Actions</p>
							</header>
							<div className="tableList-details-container">
								<div className="tableList-row">
									<p>Demo Project 1</p>
									<p>Demo Project 1</p>
									<div className="project-action-buttons">
                                        <a href="/">Manage Users</a>
                                        <a href="/projectdetails">Project details</a>
                                    </div>
								</div>
								<div className="tableList-row">
									<p>Demo Project 2</p>
									<p>Testing PM self assign on create</p>
									<div className="project-action-buttons">
                                        <a href="/">Manage Users</a>
                                        <a href="/projectdetails">Project details</a>
                                    </div>
								</div>
								<div className="tableList-row">
									<p>Positive Touch</p>
									<p>Working on Cloud migration</p>
									<div className="project-action-buttons">
                                        <a href="/">Manage Users</a>
                                        <a href="/projectdetails">Project details</a>
                                    </div>
								</div>
								<div className="tableList-row">
									<p>Portfolio</p>
									<p>My Portfolio</p>
									<div className="project-action-buttons">
                                        <a href="/">Manage Users</a>
                                        <a href="/projectdetails">Project details</a>
                                    </div>
								</div>
								<div className="tableList-row last-row">
									<p>Auction Web Store</p>
									<p>An auction web app</p>
									<div className="project-action-buttons">
                                        <a href="/">Manage Users</a>
                                        <a href="/projectdetails">Project details</a>
                                    </div>
								</div>
							</div>
							<div className="tableList-footer">
								<p>Showing 1 to 10 of 13 entries</p>
								<div className="tableList-pagination">
									<p>Previous</p>
									<p className="page-number">1</p>
									<p className="page-number">2</p>
									<p>Next</p>
								</div>
							</div>
						</main>
					</div> 
				</div>
			</main>
		</div>
	)
}

export default ProjectsList; 