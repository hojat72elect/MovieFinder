import React, {useEffect, useState} from 'react'
import {Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {StatusBar} from "expo-status-bar";
import {Bars3CenterLeftIcon, MagnifyingGlassIcon} from "react-native-heroicons/outline";
import {TrendingMovies} from "../ui/TrendingMovies";
import {MovieList} from "../ui/MovieList";
import {styles} from "../ui/Theme";
import {useNavigation} from "@react-navigation/native";
import {fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies} from "../api/MovieDb";
import {Loading} from "../ui/Loading";
import {ApiResponse, ApiResponseResults} from "../api/response/ApiResponse";

const isIos = Platform.OS === 'ios';

export const HomeScreen = () => {

    const [trending, setTrending] = useState<ApiResponseResults[]>([]);
    const [upcoming, setUpcoming] = useState<ApiResponseResults[]>([]);
    const [topRated, setTopRated] = useState<ApiResponseResults[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data: ApiResponse = await fetchTrendingMovies();
        console.log('got trending', data.results.length)
        if (data && data.results) setTrending(data.results);
        setLoading(false)
    }
    const getUpcomingMovies = async () => {
        const data: ApiResponse = await fetchUpcomingMovies();
        console.log('got upcoming', data.results.length)
        if (data && data.results) setUpcoming(data.results);
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

                    {/*A row of upcoming movies.*/}
                    {upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming}/>}

                    {/*A row of top-rated movies.*/}
                    {topRated.length > 0 && <MovieList title="Top Rated" data={topRated}/>}
                </ScrollView>)}
        </View>
    )
}
