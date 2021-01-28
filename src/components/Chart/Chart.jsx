import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		}

		fetchAPI();
	}, []);

	const lineChart = (
		dailyData.length
		? (
			<Line 
			data={{
				labels: dailyData.map(({ date }) => date),
				datasets: [{
					data: dailyData.map(({ confirmed }) => confirmed),
					label: 'Infected',
					borderColor: '#4477B2',
					backgroundColor: 'rgba(156, 236, 255, 0.5)',
					fill: true,
				}, {
					data: dailyData.map(({ deaths }) => deaths),
					label: 'Deaths',
					borderColor: '#FF6961',
					backgroundColor: 'rgba(241, 141, 158, 0.5)',
					fill: true,
				}],
			}}
		/> ) : null
	);


	const barChart = (
		confirmed
		? (
			<Bar
			 	data={{
			 		labels: ['Infected', 'Recovered', 'Deaths'],
			 		datasets: [{
			 			label: 'People',
			 			backgroundColor: ['rgba(230, 215, 42, 0.5)', 'rgba(156, 236, 255, 0.5)', 'rgba(241, 141, 158, 0.5)'],
			 			data: [confirmed.value, recovered.value, deaths.value]
			 		}]
			 	}}
			 	options={{
			 		legend: { display: false },
			 		title: { display: true, text:`Current state in ${country}`},
			 	}}
			/>
		) : null
	)

	return (
		<div className={styles.container}>
			{country? barChart : lineChart}
		</div>
	)
}

export default Chart;