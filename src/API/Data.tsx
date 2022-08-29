export default async function getPokeData() {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
	const result = await response.json();
	return result.results;
}
