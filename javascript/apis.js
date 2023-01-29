


// Constants
const apiKey = "92e213e12edf1503ca259d9218f37abf";
const apiEndPoint = "https://api.themoviedb.org/3";

// const apiPaths = {
// const fetchAllCategories = () => {

// } 

const apiPaths = {
    fetchAllCategories : `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`
}

export { apiPaths };

// module.exports.fetchAllCategories = `${apiEndPoint}/genre/movie/list?api_key=${apiKey}`;

// console.log(apiPaths.fetchAllCategories);

// module.exports = {
//     apiKey,
//     apiEndPoint,
//     ...apiPaths
// }