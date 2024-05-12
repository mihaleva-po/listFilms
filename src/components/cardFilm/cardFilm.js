import Loading from "../loading/loading";
import {useParams} from "react-router-dom";
import styles from './cardFilm.module.scss';
import {format, parseISO} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import {useQuery} from "react-query";
import getDetailsFilm from "../../api/getDetailsFilm";


const CardFilm = () => {

    const {id} = useParams();

    const {isLoading, error, data} = useQuery(['dataFilm', id], () => getDetailsFilm(id));

    if (isLoading) {
        return <Loading/>;
    }

    if (error) {
        return <span>Ошибка: {error.message}</span>;
    }

    return (
        <div className={styles['container']}>
            <div className={styles['main']}>

                <div className={styles['container-img']}>
                    <img alt={'poster'} src={`https://image.tmdb.org/t/p/w185/${data?.poster_path}`}/>
                </div>

                <div className={styles['description']}>

                    <div className={styles['blockWithTitle']}>
                        <h1>{data?.title}</h1>
                        <div className={styles['date']} style={{display: 'flex'}}>

                            <p>
                                {(format(parseISO(data?.release_date), 'LLLLLLLLLLLL yyyy',
                                        {locale: ruLocale})).charAt(0).toUpperCase() +
                                    (format(parseISO(data?.release_date), 'LLLLLLLLLLLL yyyy',
                                        {locale: ruLocale})).slice(1)} |
                            </p>

                            {data?.genres.map((el, i) => (
                                <p key={i}>&nbsp;{el?.name}</p>
                            ))}

                            <p>&nbsp; | &nbsp;{Math.floor(data?.runtime / 60)}ч {Math.floor(data?.runtime % 60)}мин</p>

                        </div>
                    </div>

                    <div className={styles['overview']}>
                        <h3 style={{marginBottom: '5px', fontWeight: 'bold'}}>Обзор</h3>
                        <p>{data?.overview}</p>
                    </div>

                    <div className={styles['country']}>
                        <div>
                            <div style={{display: 'flex'}}>
                                <b>Страна:</b>
                                &nbsp; {data?.origin_country.map((el, i) => (
                                <p key={i}>{el}</p>
                            ))}
                            </div>
                            <p><b>Оригинальный язык:</b> {data?.original_language}</p>
                        </div>

                        <div>
                            <p className={styles['rating']}>{(Math.round(data?.vote_average * 10) / 10).toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default CardFilm;
