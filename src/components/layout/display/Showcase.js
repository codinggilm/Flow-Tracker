import React from 'react';
// import TableList from './TableList';
import '../../../scss/components/layouts/Showcase.scss';

 
const Showcase = () => {
	return (
		<div> 
			<main className="showcase-main">
				<div className="list-container">
					<header className="banner-container">
						<div className="list-banner">
							<p className="list-title">Details for Project #1</p>
							<div className="project-nav-links">
                                <a href="/">Back to List</a>
                                <p>|</p>
                                <a href="/">Edit</a>
                            </div>
						</div>
					</header>
                    <div className="showcase-titles">
                        <div className="project-name">
                            <p className="title">Project Name</p>
                            <p className="detail">Demo Project 1</p>
                        </div>
                        <div className="project-description">
                            <p className="title">Project Description</p>
                            <p className="detail">This is project 1.</p>
                        </div>
                    </div>
				</div>
			</main>
		</div>
	)
}

export default Showcase; 