import React, {useEffect, useState} from 'react'
import {Dimensions, Image, Platform, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {ChevronLeftIcon} from "react-native-heroicons/outline";
import {useNavigation, useRoute} from "@react-navigation/native";
import {ApiActorDetails} from "../shared/data/entities/ApiActorDetails";
import {ApiMovie} from "../shared/data/entities/ApiMovie";
import {styles} from "../shared/Theme";
import {Loading} from "../shared/ui/Loading";
import {getImage342} from "../shared/data/repository/TmdbImagesDataSource";
import {FALLBACK_PERSON_IMAGE} from "../shared/data/Constants";
import {MovieList} from "../shared/ui/MovieList";
import {fetchPersonDetails} from "./PersonDetailsDataSource";
import {fetchPersonMovies} from "./PersonMoviesDataSource";



const ios = Platform.OS === 'ios';
const verticalMargin: number = ios ? 0 : 34;
const {width, height} = Dimensions.get('window');

export function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();

    const [person, setPerson] = useState<ApiActorDetails | null>(null);
    const [personMovies, setPersonMovies] = useState<ApiMovie[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        // @ts-ignore
        const personId: number = item.id;
        setLoading(true);
        getPersonDetails(personId);
        getPersonMovies(personId);
    }, [item]);

    const getPersonDetails = async (id: number) => {
        const data: ApiActorDetails = await fetchPersonDetails(id);
        setLoading(false);
        if (data) {
            setPerson(data);
        }
    }
    const getPersonMovies = async (id: number) => {
        const data = await fetchPersonMovies(id);
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }

    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: 'rgb(23 23 23)', paddingBottom: 20}}>
            {/*The row on top containing back button and like button.*/}
            <SafeAreaView style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: verticalMargin,
            }}
            >
                <TouchableOpacity
                    style={{backgroundColor: styles.background.backgroundColor, borderRadius: 12, padding: 2}}
                    onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
                </TouchableOpacity>


            </SafeAreaView>

            {
                loading ? (
                    <Loading/>
                ) : (
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginHorizontal: 16,
                        }}
                    >
                        {/*Person's profile picture*/}
                        <Image
                            source={{uri: getImage342(person?.profile_path ?? null) || FALLBACK_PERSON_IMAGE}}
                            style={{
                                width: width * 0.74,
                                height: height * 0.43,
                                borderRadius: 150,
                                borderWidth: 2,
                                borderColor: 'gray'
                            }}
                        />

                        {/*Person's name*/}
                        <Text style={{
                            fontSize: 30,
                            lineHeight: 36,
                            color: 'white',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: 8,
                        }}>
                            {person?.name}
                        </Text>

                        {/*Person's birthplace*/}
                        <Text
                            style={{
                                color: 'rgb(115 115 115)',
                                fontSize: 16,
                                lineHeight: 24,
                                textAlign: 'center'
                            }}>
                            {person?.place_of_birth}
                        </Text>

                        {/*A row of quick facts about that person*/}
                        <View
                            style={{
                                marginHorizontal: 3,
                                padding: 18,
                                marginTop: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: 'rgb(64 64 64)',
                                borderRadius: 9999,
                            }}
                        >
                            <View
                                style={{
                                    borderRightWidth: 2,
                                    borderRightColor: 'rgb(163 163 163)',
                                    paddingHorizontal: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '600'
                                }}>Gender</Text>
                                <Text
                                    style={{
                                        color: 'rgb(212 212 212)',
                                        fontSize: 14,
                                        lineHeight: 20
                                    }}
                                >
                                    {
                                        person?.gender === 1 ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View
                                style={{
                                    borderRightWidth: 2,
                                    borderRightColor: 'rgb(163 163 163)',
                                    paddingHorizontal: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                    }}
                                >Birthday</Text>
                                <Text style={{
                                    color: 'rgb(212 212 212)',
                                    fontSize: 14,
                                    lineHeight: 20
                                }}>
                                    {person?.birthday}
                                </Text>
                            </View>
                            <View style={{
                                borderRightWidth: 2,
                                borderRightColor: 'rgb(163 163 163)',
                                paddingHorizontal: 8,
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '600',
                                }}>Known for</Text>
                                <Text style={{
                                    color: 'rgb(212 212 212)',
                                    fontSize: 14,
                                    lineHeight: 20
                                }}>
                                    {person?.known_for_department}
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 8,
                                    alignItems: 'center'
                                }}
                            >
                                <Text
                                    style={{
                                        color: 'white',
                                        fontWeight: '600',
                                    }}>Popularity</Text>
                                <Text style={{
                                    color: 'rgb(212 212 212)',
                                    fontSize: 14,
                                    lineHeight: 20
                                }}>
                                    {person?.popularity?.toFixed(2)} %
                                </Text>
                            </View>
                        </View>

                        <Text
                            style={{
                                color: 'white',
                                fontSize: 18,
                                lineHeight: 28,
                                marginTop: 18,
                            }}
                        >Biography</Text>
                        <Text
                            style={{
                                color: 'rgb(163 163 163)',
                                letterSpacing: 1,
                                marginTop: 10
                            }}
                        >
                            {
                                person?.biography ? person.biography : 'N/A'
                            }
                        </Text>


                        {person?.id && personMovies.length > 0 &&
                            <MovieList title="Movies" hideSeeAll={true} data={personMovies}/>}

                    </View>
                )
            }


        </ScrollView>

    )
}
