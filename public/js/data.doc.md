/**
 * @module data.js — Core Data & Algorithms
 * 
 * Contains:
 * - CAPITALS: Array of 195 countries [name, capital, lat, lng, iso, continent]
 * - F: Field index constants {NAME:0, CAPITAL:1, LAT:2, LNG:3, ISO:4, CONTINENT:5}
 * - CONTINENTS: Array of continent filter values
 * 
 * Utilities:
 * - flag(iso) → flag emoji string from 2-letter ISO code
 * - haversine(lat1, lon1, lat2, lon2) → distance in km
 * - havIdx(i, j) → haversine between CAPITALS[i] and CAPITALS[j]
 * - totalDist(route) → total km for a route (array of CAPITALS indices)
 * - shuffle(arr) → Fisher-Yates shuffle, returns new array
 * 
 * TSP Solver:
 * - buildDistMatrix() → Float64Array distance matrix for CAPITALS
 * - nearestNeighbor(startIdx, dist) → greedy route from start
 * - twoOpt(route, dist, maxIter=80, matrixN=0) → improved route via 2-opt swaps
 *     matrixN: dimension of the distance matrix (required when matrix is larger than route)
 * - solveGeneric(data, startIdx) → {route, dist, totalD} for any [name,label,lat,lng,...] array
 *     Scales iterations: 300 for 200+ nodes, 100 otherwise
 * 
 * Start Capital Config:
 * - getStartCapital() → stored capital name (default: 'London')
 * - setStartCapital(name) → save to localStorage
 * - getStartIdx() → index in CAPITALS array
 * 
 * Great Circle:
 * - gcArc(lat1, lon1, lat2, lon2, segments=15) → array of [lat,lng] points along geodesic
 */
