import {IonContent, IonPage} from '@ionic/react';
import {useEffect, useState} from "react";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {ApiResponse} from "../shared/data/entities/ApiResponse";
import {fetchTrendingMovies} from "../shared/data/repository/TrendingMoviesDataSource";
import {fetchRecentlyReleasedMovies} from "../shared/data/repository/RecentlyReleasedMoviesDataSource";
import {fetchTopRatedMovies} from "../shared/data/repository/TopRatedMoviesDataSource";
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';

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
            <IonContent fullscreen>
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
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="h-full object-cover"/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="pt-2 ps-2">
                    <h1 className="px-4 pb-2 font-bold text-xl">Recently Released</h1>
                    <Swiper
                        slidesPerView={2.5}
                        spaceBetween={8}
                        pagination={{clickable: true}}
                        className="w-full h-96"
                    >
                        {recentlyReleased.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="object-cover rounded-2xl h-80"/>
                                <h2 className="text-center bottom-4 left-4 text-blue-900 font-bold text-lg drop-shadow-lg">{movie.title.length > 15 ? movie.title.substring(0, 15) + "..." : movie.title}</h2>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="ps-2">
                    <h1 className="px-4 pb-2 font-bold text-xl">Top Rated</h1>
                    <Swiper
                        slidesPerView={2.5}
                        spaceBetween={8}
                        pagination={{clickable: true}}
                        className="w-full h-96"
                    >
                        {topRated.map((movie, index) => (
                            <SwiperSlide key={index}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} className="object-cover rounded-2xl h-80"/>
                                <h2 className="text-center bottom-4 left-4 text-blue-900 font-bold text-lg drop-shadow-lg">{movie.title.length > 15 ? movie.title.substring(0, 15) + "..." : movie.title}</h2>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </IonContent>
        </IonPage>
    );
};
