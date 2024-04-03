import React from 'react'
import {Dimensions, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import Carousel from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {getImage500} from "../shared/data/repository/TmdbImagesDataSource";




const {width, height} = Dimensions.get('window');

type TrendingMoviesProps = {
    data: ApiMovie[];
};

type MovieCardProps = {
    item: any;
    handleClick: (item: any) => void
};

const MovieCard = ({item, handleClick}: MovieCardProps) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                // @ts-ignore
                source={{uri: getImage500(item.poster_path)}}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    resizeMode: 'contain',
                    borderRadius: 24
                }}
            />
        </TouchableWithoutFeedback>
    );
}

export const TrendingMovies = ({data}: TrendingMoviesProps) => {

    const navigation = useNavigation();

    const handleClick = (item: ApiMovie) => {
        // @ts-ignore
        navigation.navigate('Movie', item);
    };

    return (
        <View style={{marginBottom: 50}}>
            <Text style={{color: 'white', fontSize: 20, marginHorizontal: 16, marginBottom: 10}}>Trending</Text>
            <Carousel
                layout={'stack'}
                layoutCardOffset={18}
                data={data}
                renderItem={({item}) => <MovieCard item={item} handleClick={handleClick}/>}
                firstItem={1}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{display: 'flex', alignItems: 'center'}}
            />
        </View>
    )
}
