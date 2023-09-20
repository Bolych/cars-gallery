import React, {useState} from 'react';
import axios from 'axios';
import {
		useNavigate,
} from 'react-router-dom';

import {AppBar, Box, Button, Container, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {Car} from "../data/types";


const AddCar: React.FC = () => {
		const navigate = useNavigate();

		const [newCar, setNewCar] = useState<Car>({
				brand: '',
				model: '',
				year: undefined,
				color: '',
				price: undefined,
				image: ''
		});

		const apiUrl = 'https://64fa027e4098a7f2fc1546fc.mockapi.io/api/v1/cars';

		const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
				const {name, value, type} = event.target;
				setNewCar({
						...newCar,
						[name]: type === 'number' ? Number.parseFloat(value) : value
				});
		};

		const handleSubmit = async (event: React.FormEvent) => {
				event.preventDefault();

				if (!newCar.image || !newCar.brand || !newCar.model || !newCar.color || !newCar.price || !newCar.year) {
						alert("All fields are required.");
						return;
				}
				try {
						const response = await axios.post<Car>(apiUrl, newCar);
						console.log('Car added:', response.data);
						alert('Car added');
						setNewCar({
								brand: '',
								model: '',
								year: undefined,
								color: '',
								price: undefined,
								image: ''
						});
				} catch (error) {
						console.error(error);
				}
		};

		return (
				<div>
						<Box sx={{flexGrow: 1}}>
								<AppBar position="static">
										<Toolbar>
												<IconButton
														size="large"
														edge="start"
														color="inherit"
														aria-label="menu"
														sx={{mr: 2}}
												>
												</IconButton>
												<Typography variant="h6" component="div" sx={{flexGrow: 1}}>
														Add new car
												</Typography>
										</Toolbar>
								</AppBar>
						</Box>
						<Container>

								<form onSubmit={handleSubmit}>
										<TextField
												label="Brand"
												name="brand"
												value={newCar.brand}
												onChange={handleChange}
												margin="normal"
												fullWidth
										/>
										<TextField
												label="Model"
												name="model"
												value={newCar.model}
												onChange={handleChange}
												margin="normal"
												fullWidth
										/>
										<TextField
												label="Year"
												name="year"
												value={newCar.year ?? ''}
												onChange={handleChange}
												margin="normal"
												type="number"
												fullWidth
										/>
										<TextField
												label="Color"
												name="color"
												value={newCar.color}
												onChange={handleChange}
												margin="normal"
												fullWidth
										/>
										<TextField
												label="Price"
												name="price"
												value={newCar.price ?? ''}
												onChange={handleChange}
												margin="normal"
												type="number"
												fullWidth
										/>
										<TextField
												label="Image URL"
												name="image"
												value={newCar.image}
												onChange={handleChange}
												margin="normal"
												fullWidth
										/>
										<Box mt={2}>
												<Button type="submit" variant="contained" color="primary">
														Add Car
												</Button>
										</Box>
								</form>
								<Box mt={2}>
										<Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
												Go back
										</Button>
								</Box>
						</Container>
				</div>
		);
};

export default AddCar;
