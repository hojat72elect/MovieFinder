import React, {useEffect, useState} from 'react'
import {Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {LinearGradient} from "expo-linear-gradient";
import {HeartIcon} from "react-native-heroicons/solid";
import {MovieList} from "../ui/MovieList";
import {Cast} from "../ui/Cast";
import {styles} from "../ui/Theme";
import {fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500} from "../api/MovieDb";
import {Loading} from "../ui/Loading";
import {theme} from "../MovieAppTheme";
import {
    ApiMovieCredits,
    ApiMovieCreditsCast,
    ApiMovieDetails,
    ApiResponse,
    ApiResponseResults
} from "../api/response/ApiResponse";
import {NavigationProp} from "@react-navigation/core/src/types";

const {width, height} = Dimensions.get('window');
const isIos = Platform.OS === 'ios';
const topMargin: number = isIos ? 0 : 26;

export const MovieScreen = () => {

    const {params: item} = useRoute();
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation();

    const [movie, setMovie] = useState<ApiMovieDetails | null>(null);
    const [cast, setCast] = useState<ApiMovieCreditsCast[]>([]);
    const [similarMovies, setSimilarMovies] = useState<ApiResponseResults[]>([]);
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // @ts-ignore
        const movieId = item.id
        setLoading(true);
        getMovieDetails(movieId);
        getMovieCredits(movieId);
        getSimilarMovies(movieId);
    }, [item]);

    const getMovieDetails = async (id: number) => {
        const data: ApiMovieDetails = await fetchMovieDetails(id);
        setLoading(false);
        if (data) {
            setMovie(data);
        }
    }
    const getMovieCredits = async (id: number) => {
        const data: ApiMovieCredits = await fetchMovieCredits(id);
        if (data && data.cast) {
            setCast(data.cast);
        }
    }
    const getSimilarMovies = async (id: number) => {
        const data: ApiResponse = await fetchSimilarMovies(id);
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }

    return (
        <ScrollView
            style={{paddingBottom: 24, flex: 1, backgroundColor: 'rgb(23, 23, 23)'}}>

            <View>
                {/* back button, like button, and movie poster */}
                <SafeAreaView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingHorizontal: 14,
                        marginTop: topMargin,
                        zIndex: 20,
                        position: 'absolute',
                        width: '100%',
                    }}
                >
                    <TouchableOpacity
                        style={{backgroundColor: styles.background.backgroundColor, borderRadius: 12, padding: 2}}
                        onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size={35} color={isFavourite ? theme.background : 'white'}/>
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading/>
                    ) : (
                        <View>
                            {/*The poster of the movie*/}
                            <Image
                                source={{uri: image500(movie?.poster_path ?? null) || fallbackMoviePoster}}
                                style={{width, height: height * 0.55}}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{width, height: height * 0.40, bottom: 0, position: 'absolute'}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                            />
                        </View>
                    )
                }


            </View>

            {/* movie details */}

            <View style={{marginTop: -(height * 0.09)}}>
                {/* title */}
                <Text style={{color: 'white', textAlign: 'center', fontSize: 28, fontWeight: 'bold', letterSpacing: 1}}>
                    {
                        movie?.title
                    }
                </Text>

                {/* status, release year, runtime */}
                {
                    movie?.id ? (
                        <Text style={{
                            color: 'rgb(163 163 163)',
                            fontWeight: "600",
                            fontSize: 16,
                            lineHeight: 24,
                            textAlign: 'center',
                            paddingTop: 6,
                        }}>
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }


                {/* genres  */}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginHorizontal: 8, paddingTop: 6,}}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 !== movie.genres.length;
                            return (
                                <Text key={index} style={{
                                    color: 'rgb(163 163 163)',
                                    fontWeight: '600',
                                    fontSize: 16,
                                    lineHeight: 24,
                                    textAlign: 'center',
                                    paddingTop: 6,
                                }}
                                >
                                    {genre?.name} {showDot ? "• " : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text style={{
                    color: 'rgb(163 163 163)',
                    marginHorizontal: 8,
                    letterSpacing: 1,
                    paddingTop: 10,
                }}>
                    {
                        movie?.overview
                    }
                </Text>

            </View>


            {/* cast */}
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast}/>
            }

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 &&
                <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies}/>
            }

        </ScrollView>
    )
}

