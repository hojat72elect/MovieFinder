import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    TextInput,
    TouchableOpacity,
    View,
    Image,
    Text,
} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useCallback, useState} from "react";
import {debounce} from 'lodash';
import {XMarkIcon} from "react-native-heroicons/mini";
import {Loading} from "../Loading";
import {searchMovies} from "../../api/repository/MovieSearchDataSource";
import {FALLBACK_MOVIE_POSTER} from "../../api/Constants";
import {getImage185} from "../../api/repository/TmdbImagesDataSource";

const {width, height} = Dimensions.get('window');

export default function SearchScreen() {
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any[]>([])

    const handleSearch = (search: string) => {
        if (search && search.length > 2) {
            setLoading(true);
            searchMovies({
                query: search,
                include_adult: false,
                language: 'en-US',
                page: '1'
            }).then((data) => {
                setLoading(false);
                if (data && data.results) setResults(data.results);
            })
        } else {
            setLoading(false);
            setResults([])
        }
    }

    const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

    return (
        <SafeAreaView
            style={{
                backgroundColor: 'dimgray',
                flex: 1
            }}
        >

            {/* search input */}
            <View
                style={{
                    marginHorizontal: 18,
                    marginTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: 'oldlace',
                    borderRadius: 100,
                }}
            >
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder="Search Movies"
                    placeholderTextColor={'lightgray'}
                    style={{
                        paddingLeft: 19,
                        fontSize: 18,
                        flex: 1,
                        color: 'white',
                        letterSpacing: 1,
                    }}
                />
                <TouchableOpacity
                    // @ts-ignore
                    onPress={() => navigation.navigate('Home')}
                    style={{
                        borderRadius: 100,
                        padding: 12,
                        margin: 4,
                        backgroundColor: 'rgb(115 115 115)',
                    }}
                >
                    <XMarkIcon size={25} color="white"/>
                </TouchableOpacity>
            </View>

            {/* search results */}
            {
                loading ? (
                        <Loading/>
                    ) :
                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15}}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontWeight: '600',
                                    marginLeft: 2
                                }}
                            >Results ({results.length})</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                }}
                            >
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                // @ts-ignore
                                                onPress={() => navigation.push('Movie', item)}>
                                                <View
                                                    style={{marginTop: 10}}
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
                                    })
                                }
                            </View>

                        </ScrollView>
                    ) : (

                        <Image
                            source={require('../../../assets/images/movieTime.png')}
                            style={{
                                height: 400,
                                width: 400,
                                alignItems: 'center',
                            }}
                        />

                    )
            }
        </SafeAreaView>
    )
}
