import React, {useEffect, useState} from 'react'
import {Platform, SafeAreaView, ScrollView, Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {fetchTrendingMovies} from "../shared/data/repository/TrendingMoviesDataSource";
import {ApiResponse} from "../shared/data/entities/ApiResponse";
import {fetchRecentlyReleasedMovies} from "../shared/data/repository/RecentlyReleasedMoviesDataSource";
import {fetchTopRatedMovies} from "../shared/data/repository/TopRatedMoviesDataSource";
import {Loading} from "../shared/ui/Loading";
import {MovieList} from "../shared/ui/MovieList";
import {TrendingMovies} from "./TrendingMovies";
import {DomainMovieCategory} from "../shared/ui/DomainMovieCategory";
import {useTranslation} from "react-i18next";


const isIos = Platform.OS === 'ios';

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
    const {t} = useTranslation();

    const getTrendingMovies = async () => {
        const data: ApiResponse = await fetchTrendingMovies();
        console.log('got trending', data.results.length)
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getRecentlyReleasedMovies = async () => {
        const data: ApiResponse = await fetchRecentlyReleasedMovies();
        console.log('got recentlyReleased', data.results.length)
        if (data && data.results) setRecentlyReleased(data.results);
    }
    const getTopRatedMovies = async () => {
        const data: ApiResponse = await fetchTopRatedMovies();
        if (data && data.results) setTopRated(data.results);
    }

    const safeAreaViewMarginBottom: number = isIos ? -2 : 3

    return (
        <View style={{flex: 1, backgroundColor: 'gray'}}>
            <SafeAreaView style={{marginBottom: safeAreaViewMarginBottom}}>
                <StatusBar style="light"/>
                {/*Search bar and logo*/}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginHorizontal: 14,
                    marginVertical: 26
                }}
                >
                    <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
                        {t("app_name")}
                    </Text>
                </View>
            </SafeAreaView>
            {/*List of movies*/}
            {loading ? (
                <Loading/>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{paddingBottom: 10}}
                >
                    {/*Trending movies carousel.*/}
                    {trending.length > 0 && <TrendingMovies data={trending}/>}

                    {/*A row of recently released movies.*/}
                    {recentlyReleased.length > 0 &&
                        <MovieList
                            title={t("recently_released")}
                            data={recentlyReleased}
                            category={DomainMovieCategory.RECENTLY_RELEASED}
                        />}

                    {/*A row of top-rated movies.*/}
                    {topRated.length > 0 &&
                        <MovieList title={t("top_rated")} data={topRated} category={DomainMovieCategory.TOP_RATED}/>}
                </ScrollView>)}
        </View>
    )
}
