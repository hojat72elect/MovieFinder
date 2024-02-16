import React, {useEffect, useState} from 'react'
import {Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {TrendingMovies} from "../TrendingMovies";
import {MovieList} from "../MovieList";
import {styles} from "../Theme";
import {useNavigation} from "@react-navigation/native";
import {Loading} from "../Loading";
import {ApiMovie} from "../../api/entities/ApiMovie";
import {ApiResponse} from "../../api/entities/ApiResponse";
import {fetchTrendingMovies} from "../../api/repository/TrendingMoviesDataSource";
import {fetchRecentlyReleasedMovies} from "../../api/repository/RecentlyReleasedMoviesDataSource";
import {fetchTopRatedMovies} from "../../api/repository/TopRatedMoviesDataSource";

const isIos = Platform.OS === 'ios';

export const HomeScreen = () => {

    const [trending, setTrending] = useState<ApiMovie[]>([]);
    const [recentlyReleased, setRecentlyReleased] = useState<ApiMovie[]>([]);
    const [topRated, setTopRated] = useState<ApiMovie[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getRecentlyReleasedMovies();
        getTopRatedMovies();
    }, []);

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
        console.log('got top rated', data.results.length)
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
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 14,
                    marginVertical: 26
                }}
                >
                    <Bars3CenterLeftIcon size={30} strokeWidth={2} color="white"/>
                    <Text style={{color: 'white', fontSize: 28, fontWeight: 'bold'}}>
                        <Text style={styles.text}>M</Text>ovies
                    </Text>
                    {/*@ts-ignore*/}
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <MagnifyingGlassIcon size={30} strokeWidth={2} color="white"/>
                    </TouchableOpacity>
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
                    {recentlyReleased.length > 0 && <MovieList title="Recently Released" data={recentlyReleased}/>}

                    {/*A row of top-rated movies.*/}
                    {topRated.length > 0 && <MovieList title="Top Rated" data={topRated}/>}
                </ScrollView>)}
        </View>
    )
}
