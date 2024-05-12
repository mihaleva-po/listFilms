import {useEffect, useState} from "react";
import getPopularFilms from "../../api/getPopularFilms";
import {useNavigate} from "react-router-dom";
import Loading from "../loading/loading";
import styles from './popularFilms.module.scss';
import {format, parseISO} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {useQuery} from "react-query";


const PopularFilms = () => {

    const [page, setPage] = useState(1);
    const [listFilms, setListFilms] = useState([]);
    const {isLoading, error, data} = useQuery(['popularFilms', page],
        () => getPopularFilms(page));

    useEffect(() => {
        if (data) {
            setListFilms((prevListFilms) => [...prevListFilms, ...data])
        }
    }, [data]);

    const handleScroll = () => {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight * 0.9) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    const navigation = useNavigate();

    const goCardFilm = (id) => {
        navigation(`/description/${id}`);
    }

    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <div className={styles['container']}>

            {
                listFilms.length <= 0 && !isLoading ?
                    <h1>Включите VPN!</h1>
                    :
                    <div className={styles['listFilms']}>
                        {
                            listFilms.map((film, i) => (
                                <div className={styles['cardFilm']} key={i} onClick={() => goCardFilm(film?.id)}>
                                    <div style={{position: 'relative'}}>
                                        <div className={styles['container-img']}>
                                            <img alt={'poster'}
                                                 src={`https://image.tmdb.org/t/p/w185/${film?.poster_path}`}/>
                                        </div>

                                        {
                                            Math.round(film?.vote_average * 10) / 10 === 0 ?
                                                null
                                                :
                                                <p className={styles['rating']}>{(Math.round(film?.vote_average * 10) / 10).toFixed(1)}</p>
                                        }

                                    </div>

                                    <div style={{margin: '10px 15px 15px 15px'}}>
                                        <p className={styles['title']}>{film?.title}</p>

                                        <p className={styles['date']}>
                                            {
                                                (film?.release_date).length > 0
                                                    ?
                                                    (format(parseISO(film?.release_date), 'LLLLLLLLLLLL yyyy',
                                                        {locale: ruLocale})).charAt(0).toUpperCase() +
                                                    (format(parseISO(film?.release_date), 'LLLLLLLLLLLL yyyy',
                                                        {locale: ruLocale})).slice(1)
                                                    : null}
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }

            {
                isLoading ? <Loading/> : null
            }
        </div>
    );
}

export default PopularFilms;
