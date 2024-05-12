import {options} from "./options";


const getDetailsFilm = async (id) => {

    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=ru-RU`, options);
        return await response.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

export default getDetailsFilm;
