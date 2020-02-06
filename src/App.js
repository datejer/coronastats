import React from "react";
import styled from "styled-components";
import useSWR from "swr";
import fetch from "unfetch";

import background from "./assets/background.jpg";

const fetcher = url => fetch(url).then(r => r.json());

const Container = styled.div`
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	&::after {
		content: "";
		position: fixed;
		top: -5%;
		left: -5%;
		z-index: -1;

		display: block;
		background-image: url(${background});
		background-size: cover;
		background-position: center;
		width: 110%;
		height: 110%;

		-webkit-filter: blur(5px);
		-moz-filter: blur(5px);
		-o-filter: blur(5px);
		-ms-filter: blur(5px);
		filter: blur(5px);
	}
`;

const Box = styled.div`
	background-color: rgba(0, 0, 0, 0.5);
	border-radius: 1em;
	width: fit-content;
	padding: 2em;
	text-align: center;
	@media (max-width: 550px) {
		padding: 1em;
	}
`;

const Title = styled.h1`
	font-family: "Special Elite", cursive;
	font-size: 4em;
	margin: 2rem 2rem 0.1em;
	@media (max-width: 550px) {
		font-size: 2em;
	}
`;

const Subtitle = styled.p`
	font-size: 1.2em;
	margin-top: 0;
	margin-bottom: 2rem;
	font-weight: 400;
`;

const Flexbox = styled.div`
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
	overflow: hidden;
	margin: 2em 0;
`;

const Column = styled.div`
	flex: 1;
`;

const Amount = styled.h2`
	color: red;
`;

const Caption = styled.h3``;

const App = () => {
	const { data } = useSWR(
		"https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/ncov_cases/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outStatistics=%5B%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Confirmed%22%2C%22outStatisticFieldName%22%3A%22confirmed%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Deaths%22%2C%22outStatisticFieldName%22%3A%22deaths%22%7D%2C%20%7B%22statisticType%22%3A%22sum%22%2C%22onStatisticField%22%3A%22Recovered%22%2C%22outStatisticFieldName%22%3A%22recovered%22%7D%5D&outSR=102100&cacheHint=false",
		fetcher
	);

	return (
		<Container>
			<Box>
				<Title>Coronavirus</Title>
				<Subtitle>we're all f*cked</Subtitle>
				<Flexbox>
					<Column>
						<Amount>
							{data ? (
								<div>{data.features[0].attributes.confirmed}</div>
							) : (
								<div>loading...</div>
							)}
						</Amount>
						<Caption>Confirmed</Caption>
					</Column>
					<Column>
						<Amount>
							{data ? (
								<div>{data.features[0].attributes.deaths}</div>
							) : (
								<div>loading...</div>
							)}
						</Amount>
						<Caption>Deaths</Caption>
					</Column>
					<Column>
						<Amount>
							{data ? (
								<div>{data.features[0].attributes.recovered}</div>
							) : (
								<div>loading...</div>
							)}
						</Amount>
						<Caption>Recovered</Caption>
					</Column>
				</Flexbox>
			</Box>
		</Container>
	);
};

export default App;
