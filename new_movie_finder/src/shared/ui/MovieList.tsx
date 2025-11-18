import {Swiper, SwiperSlide} from "swiper/react";
import {ApiMovie} from "../data/entities/ApiMovie";

interface MovieListProps {
    movies: ApiMovie[];
    title: string
}

export const MovieList: React.FC<MovieListProps> = ({movies, title}) => {
    return (
        <div>
            <h1 className="px-4 pb-2 font-bold text-xl">{title}</h1>
            <Swiper
                slidesPerView={2.5}
                spaceBetween={8}
                pagination={{clickable: true}}
                className="w-full h-96"
            >
                {movies.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                            alt={movie.title}
                            className="object-cover rounded-2xl h-80"
                        />
                        <h2 className="text-center bottom-4 left-4 text-blue-900 font-bold text-lg drop-shadow-lg">
                            {movie.title.length > 15
                                ? movie.title.substring(0, 15) + "..."
                                : movie.title}
                        </h2>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>

    );
};
