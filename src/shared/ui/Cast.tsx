import React from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp} from "@react-navigation/core/src/types";
import {ApiActor} from "../data/entities/ApiActor";
import {getImage185} from "../data/repository/TmdbImagesDataSource";
import {FALLBACK_PERSON_IMAGE} from "../data/Constants";



type CastProps = {
    cast: ApiActor[];
    navigation: NavigationProp<ReactNavigation.RootParamList>;
};

export const Cast = ({cast, navigation}: CastProps) => {

    return (
        <View style={{marginVertical: 8}}>
            <Text
                style={{
                    color: 'white',
                    fontSize: 18,
                    lineHeight: 24,
                    marginHorizontal: 8
                }}>Top Cast</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{paddingHorizontal: 15, marginTop: 10}}
            >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                // @ts-ignore
                                onPress={() => navigation.navigate('Person', person)}
                                style={{marginRight: 8, flexDirection: 'column', alignItems: 'center'}}
                            >

                                <Image
                                    style={{
                                        overflow: 'hidden',
                                        borderRadius: 1000,
                                        height: 72,
                                        width: 72,
                                        borderWidth: 2,
                                        borderColor: 'rgb(115 115 115)',
                                    }}
                                    source={{uri: getImage185(person?.profile_path) || FALLBACK_PERSON_IMAGE}}
                                />

                                <Text
                                    style={{
                                        color: 'white',
                                        fontSize: 12,
                                        lineHeight: 16,
                                        marginTop: 3
                                    }}>
                                    {
                                        person?.character.length > 10 ? person.character.slice(0, 10) + '...' : person?.character
                                    }
                                </Text>

                                <Text style={{
                                    color: 'rgb(163 163 163)',
                                    fontSize: 12,
                                    lineHeight: 16,
                                }}>
                                    {
                                        person?.original_name.length > 10 ? person.original_name.slice(0, 10) + '...' : person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>

        </View>
    )
}

