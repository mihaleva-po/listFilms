import {
    HashRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import PopularFilms from "./components/popularFilms/popularFilms";
import CardFilm from "./components/cardFilm/cardFilm";
import styles from './App.module.scss';
import {QueryClient, QueryClientProvider} from "react-query";


const query = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={query}>
            <div className={styles['header']}>
                <p>Популярные фильмы</p>
            </div>
            <Router>
                <Routes>
                    <Route element={<PopularFilms/>} path={'/'}/>
                    <Route element={<CardFilm/>} path={'/description/:id'}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
