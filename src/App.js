import React from 'react';
import './scss/App.scss';
import TopNav from './components/navigation/TopNav/TopNav';
import SideNav from './components/navigation/SideNav/SideNav';

const App = () => {
	return (
		<div>
			<main>
				<TopNav />
				<SideNav />
			</main>
		</div>
	)
}

export default App;
