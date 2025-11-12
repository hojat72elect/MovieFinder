import React, {useEffect, useRef, useState} from 'react'
import {Dimensions, FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {getImage500} from "../shared/data/repository/TmdbImagesDataSource";




const {width, height} = Dimensions.get('window');

type TrendingMoviesProps = {
    data: ApiMovie[];
};

type MovieCardProps = {
    item: any;
    handleClick: (item: any) => void;
    index: number;
    activeIndex: number;
};

const MovieCard = ({item, handleClick, index, activeIndex}: MovieCardProps) => {
    const isActive = index === activeIndex;
    const opacity = isActive ? 1 : 0.60;
    
    return (
        <View style={{
            width: width * 0.62,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: (width - width * 0.62) / 2,
        }}>
            <TouchableWithoutFeedback onPress={() => handleClick(item)}>
                <Image
                    // @ts-ignore
                    source={{uri: getImage500(item.poster_path)}}
                    style={{
                        width: width * 0.6,
                        height: height * 0.4,
                        resizeMode: 'contain',
                        borderRadius: 24,
                        opacity: opacity
                    }}
                />
            </TouchableWithoutFeedback>
        </View>
    );
}

export const TrendingMovies = ({data}: TrendingMoviesProps) => {

    const navigation = useNavigation();
    const flatListRef = useRef<FlatList>(null);
    const [activeIndex, setActiveIndex] = useState(1);

    const handleClick = (item: ApiMovie) => {
        // @ts-ignore
        navigation.navigate('Movie', item);
    };

    const onViewableItemsChanged = useRef(({viewableItems}: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index || 0);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50
    }).current;

    useEffect(() => {
        // Scroll to index 1 after component mounts (matching original carousel behavior)
        if (data && data.length > 1 && flatListRef.current) {
            setTimeout(() => {
                try {
                    flatListRef.current?.scrollToOffset({
                        offset: width * 0.62 * 1,
                        animated: false
                    });
                } catch (e) {
                    // Ignore scroll errors
                }
            }, 200);
        }
    }, [data]);

    if (!data || data.length === 0) {
        return null;
    }

    const itemWidth = Math.round(width * 0.62);
    
    return (
        <View style={{marginBottom: 50}}>
            <Text style={{color: 'white', fontSize: 20, marginHorizontal: 16, marginBottom: 10}}>Trending</Text>
            <FlatList
                ref={flatListRef}
                data={data}
                renderItem={({item, index}) => (
                    <MovieCard 
                        item={item} 
                        handleClick={handleClick}
                        index={index}
                        activeIndex={activeIndex}
                    />
                )}
                keyExtractor={(item, index) => `trending-${item.id}-${index}`}
                horizontal={true}
                pagingEnabled={false}
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                contentContainerStyle={{
                    paddingHorizontal: Math.round((width - itemWidth) / 2),
                }}
            />
        </View>
    )
}
