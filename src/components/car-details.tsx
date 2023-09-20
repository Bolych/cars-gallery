import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {
		useNavigate,
} from 'react-router-dom';
import {
		Button, Container, Card, CardMedia, CardContent, Typography, CircularProgress, AppBar, Toolbar, IconButton
} from '@mui/material';
import {Car} from "../data/types";


export const CarDetails: React.FC = () => {
		const navigate = useNavigate();
		const {id} = useParams();
		const [car, setCar] = useState<Car | undefined>();

		useEffect(() => {
				const fetchData = async () => {
						try {
								const response = await axios.get<Car>(`https://64fa027e4098a7f2fc1546fc.mockapi.io/api/v1/cars/${id}`);
								setCar(response.data);
						} catch (error) {
								console.error(error);
						}
				};
				fetchData();
		}, [id]);

		return (
				<div>

						<AppBar position="static">
								<Toolbar>
										<IconButton
												size="large"
												edge="start"
												color="inherit"
												aria-label="menu"
												sx={{mr: 2}}>
										</IconButton>
										<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
										Car overview
										</Typography>

								</Toolbar>
						</AppBar>
						<Container>


								{car ? (


										<Card style={{marginTop: '1em', paddingBottom: '2em'}} variant="outlined">
												<CardMedia
														className='car-detailed-item'
														component="img"
														height="450"
														image={car.image}
														alt={car.brand}
												/>
												<CardContent>
														<Typography variant="h4">
																{car.brand} {car.model}
														</Typography>
														<Typography variant="body2">Year: {car.year}</Typography>
														<Typography variant="body2">Price: {car.price}$</Typography>
														<Typography variant="body2">Color: {car.color}</Typography>
														<Typography variant="body2">Engine: {car.engineType}</Typography>
														{car.transmission && <Typography variant="body2">Transmission: {car.transmission}</Typography>}
														{car.range && <Typography variant="body2">Max distance: {car.range}</Typography>}
												</CardContent>
												<Button
														variant="contained"
														color="secondary"
														onClick={() => navigate(-1)}
												>
														Go back
												</Button>
										</Card>
								) : (
										<CircularProgress/>
								)}

						</Container>
				</div>
		);
};
