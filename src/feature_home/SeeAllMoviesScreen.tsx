import {Dimensions, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {ApiResponse} from "../shared/data/entities/ApiResponse";
import {fetchRecentlyReleasedMovies} from "../shared/data/repository/RecentlyReleasedMoviesDataSource";
import {fetchTopRatedMovies} from "../shared/data/repository/TopRatedMoviesDataSource";
import {getImage185} from "../shared/data/repository/TmdbImagesDataSource";
import {FALLBACK_MOVIE_POSTER} from "../shared/data/Constants";
import {DomainMovieCategory} from "../shared/ui/DomainMovieCategory";


const {width, height} = Dimensions.get('window');

export const SeeAllMoviesScreen = () => {

    const navigation = useNavigation();
    const {params: item} = useRoute();
    const [movies, setMovies] = useState<ApiMovie[]>([]);

    useEffect(() => {
        getMovies().then(moviesData => {
            if (moviesData && moviesData.results) setMovies(moviesData.results);
        });
    }, []);

    const getMovies = async () => {
        let data: ApiResponse | null = null;
        // @ts-ignore
        if (item === DomainMovieCategory.RECENTLY_RELEASED) {
            data = await fetchRecentlyReleasedMovies();
        } else { // @ts-ignore
            if (item === DomainMovieCategory.TOP_RATED) {
                data = await fetchTopRatedMovies();
            }
        }
        return data
    }


    return (
        <SafeAreaView
            style={{
                backgroundColor: 'dimgray',
                flex: 1,
            }}>

            {/* Movies of a specific category we wanna show to the user.*/}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                }}
            >
                {movies.map((item, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            // @ts-ignore
                            onPress={() => navigation.push('Movie', item)}
                        >
                            <View
                                style={{marginTop: 50}}
                            >
                                <Image
                                    source={{uri: getImage185(item.poster_path) || FALLBACK_MOVIE_POSTER}}
                                    style={{
                                        width: width * 0.44,
                                        height: height * 0.3,
                                        borderRadius: 30
                                    }}
                                />
                                <Text
                                    style={{
                                        color: 'lightgray',
                                        alignSelf: 'center',
                                        marginTop: 8,
                                    }}
                                >
                                    {
                                        item.title.length > 22 ? item.title.slice(0, 22) + '...' : item.title
                                    }
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>

        </SafeAreaView>
    )
}

