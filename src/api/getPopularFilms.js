import {options} from "./options";


const getPopularFilms = async (page) => {

    try {
        const response = await
            fetch(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${page}`, options);
        const data = await response.json();
        return data.results;
    } catch (err) {
        console.log(err);
        return null;
    }
}


export default getPopularFilms;

