import React from 'react'
import {Dimensions, Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {fallbackMoviePoster, image185} from "../api/MovieDb";
import {ApiResponseResults} from "../api/response/ApiResponse";
import {styles} from "./Theme";

const {width, height} = Dimensions.get('window');

type MovieListProps = {
    title: string;
    data: ApiResponseResults[];
    hideSeeAll?: boolean;
};

export const MovieList = ({title, data, hideSeeAll = false}: MovieListProps) => {

    const navigation = useNavigation();

    return (
        <View style={{marginBottom: 18, marginTop: 8}}>
            {/*The row on top of the movies list.*/}
            <View style={{
                marginHorizontal: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 16,
            }}>
                <Text style={{color: 'white', fontSize: 20}}>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text style={{color: styles.text.color, fontSize: 16}}>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>
            {/*A scrollable row of movies.*/}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{paddingHorizontal: 12}}
            >
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
                                    // @ts-ignore
                                    navigation.push('Movie', item);
                                }}
                            >
                                {/*Each card inside the horizontal scroll view.*/}
                                <View style={{marginRight: 18, flexDirection: 'column', alignItems: 'center'}}>
                                    <Image
                                        source={{uri: image185(item.poster_path) || fallbackMoviePoster}}
                                        style={{
                                            width: width * 0.33,
                                            height: height * 0.22,
                                            resizeMode: 'cover',
                                            borderRadius: 24,
                                            marginBottom: 8,
                                        }}
                                    />
                                    <Text style={{color: 'lightgray'}}>
                                        {
                                            item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};
