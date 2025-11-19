import {IonContent, IonPage} from '@ionic/react';
import {useEffect, useState} from "react";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {ApiResponse} from "../shared/data/entities/ApiResponse";
import {fetchTrendingMovies} from "../shared/data/repository/TrendingMoviesDataSource";
import {fetchRecentlyReleasedMovies} from "../shared/data/repository/RecentlyReleasedMoviesDataSource";
import {fetchTopRatedMovies} from "../shared/data/repository/TopRatedMoviesDataSource";
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import {MovieList} from './MovieList';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import 'swiper/css/effect-cards';

export const HomeScreen = () => {


    const [trending, setTrending] = useState<ApiMovie[]>([]);
    const [recentlyReleased, setRecentlyReleased] = useState<ApiMovie[]>([]);
    const [topRated, setTopRated] = useState<ApiMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTrendingMovies();
        getRecentlyReleasedMovies();
        getTopRatedMovies();

    }, []);

    const getTrendingMovies = async () => {
        const data: ApiResponse = await fetchTrendingMovies();
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getRecentlyReleasedMovies = async () => {
        const data: ApiResponse = await fetchRecentlyReleasedMovies();
        if (data && data.results) setRecentlyReleased(data.results);
    }
    const getTopRatedMovies = async () => {
        const data: ApiResponse = await fetchTopRatedMovies();
        if (data && data.results) setTopRated(data.results);
    }

    return (
        <IonPage>
            <IonContent fullscreen style={{'--background': '#808080'}}>
                <div className="py-2">
                    <h1 className="px-4 pb-2 font-bold text-xl">Trending</h1>
                    <Swiper
                        effect={"cards"}
                        grabCursor={true}
                        modules={[EffectCards]}
                        pagination={{clickable: true}}
                        className="w-full max-w-[15rem] h-96"
                    >
                        {trending.map((movie, index) => (
                            <SwiperSlide key={index} className="rounded-2xl shadow-lg overflow-hidden">
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title}
                                     className="h-full object-cover"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/*Recently released movies*/}
                <MovieList movies={recentlyReleased} title="Recently Released" className="pt-2 ps-2"/>

                {/*Top rated movies*/}
                <MovieList movies={topRated} title={"Top Rated"} className="ps-2"/>

            </IonContent>
        </IonPage>
    );
};
