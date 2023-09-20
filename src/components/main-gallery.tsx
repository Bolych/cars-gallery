import React, {useCallback, useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import axios from "axios";


import {
		TextField,
		Button,
		Container,
		Select,
		MenuItem,
		Box,
		Card,
		CardMedia,
		CardContent,
		Typography,
		Grid,
		AppBar,
		Toolbar,
		IconButton,
		FormControl,
		InputLabel,
		CircularProgress, Pagination
} from '@mui/material';
import {Car} from "../data/types";


export const MainGallery: React.FC = () => {
		const [cars, setCars] = useState<Car[]>([]);
		const [filteredCars, setFilteredCars] = useState<Car[]>([]);
		const [brandFilter, setBrandFilter] = useState<string>('');
		const [colorFilter, setColorFilter] = useState<string>('');
		const [isLoading, setIsLoading] = useState<boolean>(false);
		const [selectedSort, setSelectedSort] = useState<string>('');
		const [currentPage, setCurrentPage] = useState<number>(1);
		const [totalPages, setTotalPages] = useState<number>(1);

		const apiUrl = 'https://64fa027e4098a7f2fc1546fc.mockapi.io/api/v1/cars';


		const getCars = useCallback(async () => {
				try {
						setIsLoading(true);
						const response = await axios.get(apiUrl);
						const allCars = response.data;  // Get all cars
						setCars(allCars); // Store all cars
						setIsLoading(false);
				} catch (error) {
						console.error(error);
						setIsLoading(false);
				}
		}, [apiUrl]);


// Pagination, Filtering, Sorting.
		useEffect(() => {
				let filteredAndSortedCars = [...cars];
				filteredAndSortedCars = filterCars(filteredAndSortedCars);
				filteredAndSortedCars = sortCars(filteredAndSortedCars);
				const startIndex = (currentPage - 1) * 10;
				const endIndex = startIndex + 10;
				const currentCars = filteredAndSortedCars.slice(startIndex, endIndex);
				setFilteredCars(currentCars);
				const newTotalPages = Math.ceil(filteredAndSortedCars.length / 10);
				setTotalPages(newTotalPages);
		}, [brandFilter, colorFilter, selectedSort, currentPage, cars]);

		useEffect(() => {
				getCars();
				window.scrollTo({ top: 0, behavior: 'smooth' });
		}, [getCars, currentPage]);

// @ts-ignore
		const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
				setCurrentPage(page);
		};


				const handleSortChange = (event: any) => {
						setSelectedSort(event.target.value);
				};


		useEffect(() => {
				filterAndSortCars();
		}, [brandFilter, colorFilter, selectedSort]);

		const handleBrandFilterChange = (event: any) => {
				setBrandFilter(event.target.value);
		};

		const handleColorFilterChange = (event: any) => {
				setColorFilter(event.target.value);
		};

		const filterCars = (carsToFilter: any) => {
				let filteredCars = [...carsToFilter];

				if (brandFilter) {
						const brandFilterLower = brandFilter.toLowerCase();
						filteredCars = filteredCars.filter(car => car.brand.toLowerCase().includes(brandFilterLower));
				}
				if (colorFilter) {
						const colorFilterLower = colorFilter.toLowerCase();
						filteredCars = filteredCars.filter(car => car.color.toLowerCase().includes(colorFilterLower));
				}
				return filteredCars;
		};

		const sortCars = (carsToSort: Car[]) => {
				const sortedCars = [...carsToSort];

				switch (selectedSort) {
						case "Expensive first": {
								sortedCars.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
								break;
						}
						case "Cheapest first": {
								sortedCars.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
								break;
						}
						case "Newest": {
								sortedCars.sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
								break;
						}
						case "Oldest": {
								sortedCars.sort((a, b) => (a.year ?? 0) - (b.year ?? 0));
								break;
						}
						default: {
								break;
						}
				}
				return sortedCars;
		};


		const filterAndSortCars = () => {
				let filteredAndSortedCars = [...cars];
				filteredAndSortedCars = filterCars(filteredAndSortedCars);
				filteredAndSortedCars = sortCars(filteredAndSortedCars);
				setFilteredCars(filteredAndSortedCars);
		};

		const clearAllFilters = () => {
				setBrandFilter("");
				setColorFilter("");
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
														Car Gallery
												</Typography>
										</Toolbar>
								</AppBar>
						</Box>
						<Container>
								<Grid container spacing={3}>
										<Grid item xs={12} sm={4} className="left-bar">
												<Box my={4}>
														<Box marginBottom='1em'>
																<NavLink to="/add-car">
																		<Button variant="contained" color="primary" fullWidth>
																				Adding car feature
																		</Button>
																</NavLink>
														</Box>
														<TextField
																label="Filter by Brand"
																value={brandFilter}
																onChange={handleBrandFilterChange}
																variant="outlined"
																fullWidth
														/>
														<TextField
																label="Filter by Color"
																value={colorFilter}
																onChange={handleColorFilterChange}
																variant="outlined"
																fullWidth
																style={{marginTop: "1em"}}
														/>
														<Button
																variant="contained"
																color="secondary"
																onClick={clearAllFilters}
																style={{marginTop: "1em"}}
																fullWidth
														>
																Remove Filters
														</Button>
												</Box>
												<Box my={2}>
														<FormControl fullWidth>
																<InputLabel id="sort-cars">Sort by:</InputLabel>

																<Select
																		value={selectedSort}
																		onChange={handleSortChange}
																		variant="outlined"
																		fullWidth
																		label="Sort by:"

																>
																		<MenuItem value=""><em>None</em></MenuItem>
																		<MenuItem value="Expensive first">Expensive first</MenuItem>
																		<MenuItem value="Cheapest first">Cheapest first</MenuItem>
																		<MenuItem value="Newest">Newest</MenuItem>
																		<MenuItem value="Oldest">Oldest</MenuItem>
																</Select>
														</FormControl>

												</Box>

										</Grid>
										<Grid item xs={12} sm={8}>
												<Box my={4}>
														{isLoading ? (
																<Box display="flex" justifyContent="center" width='30em'>
																		<CircularProgress/>
																</Box>
														) : (
																filteredCars.map((car) => (
																		<NavLink to={`/car/${car.id}`} key={car.id}>
																				<Card variant="outlined" style={{marginBottom: "1em"}}>
																						<CardMedia
																								component="img"
																								height="250"
																								image={car.image}
																								alt={car.brand}
																						/>
																						<CardContent>
																								<Typography variant="h5">
																										{car.brand} {car.model} ({car.year})
																								</Typography>
																								<Typography variant="body2">
																										{car.price}$
																								</Typography>
																						</CardContent>
																				</Card>
																		</NavLink>
																)))}
												</Box>
												<Box display="flex" justifyContent="center" my={2}>
														<Pagination
																count={totalPages}
																page={currentPage}
																onChange={(page, event) => handlePageChange(page, event)}
																variant="outlined"
																shape="rounded"
														/>
												</Box>
										</Grid>
								</Grid>
						</Container>
				</div>

		);
};
