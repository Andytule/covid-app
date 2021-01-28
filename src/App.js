//Only class based component
import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImage from './images/image.png';

class App extends React.Component {
	//Initial state
	state = {
		data: {},
		country: '',
	}

	//Making a request to the data and setting data to the state
	async componentDidMount() {
		const fetchedData = await fetchData();

		this.setState({ data: fetchedData });
	}

	//Get country and use the new country to set the data
	handleCountryChange = async (country) => {
		const fetchedData = await fetchData(country);

		this.setState({ data: fetchedData, country: country });

	}

	render() {
		const { data, country } = this.state
		return (
			<div className={styles.container}>
				<img className={styles.image} src={coronaImage} alt="COVID-19"/>
				<Cards data={data}/>
				<CountryPicker handleCountryChange={this.handleCountryChange}/>
				<Chart data={data} country={country}/>
			</div>
		)
	}
}

export default App; 