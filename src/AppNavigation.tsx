import React, {ReactNode} from 'react'
import {NavigationContainer, Route} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HomeScreen} from "./ui/screens/HomeScreen";
import {MovieScreen} from "./ui/screens/MovieScreen";
import {PersonScreen} from "./ui/screens/PersonScreen";
import SearchScreen from "./ui/screens/SearchScreen";
import {Destination} from "./Destination";
import {AppTheme} from "./AppTheme";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {
    Cog6ToothIcon as SettingsOutline,
    HomeIcon as HomeOutline,
    MagnifyingGlassIcon as SearchOutline,
} from 'react-native-heroicons/outline';
import {
    Cog6ToothIcon as SettingsSolid,
    HomeIcon as HomeSolid,
    MagnifyingGlassIcon as SearchSolid
} from 'react-native-heroicons/solid';
import {Text, View} from "react-native";
import {SettingsScreen} from "./ui/screens/SettingsScreen";


// The 2 navigators used for the navigation module of this app.
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * @param route - the Route<> that this icon is referring to.
 * @param focused - Whether that icon is in focus mode or not.
 */
const bottomBarIcons = (route: Route<any>, focused: boolean) => {
    let icon: ReactNode;

    if (route.name === Destination.Discover.route) {
        icon = focused ? <HomeSolid size={30} color={AppTheme.secondary}/> :
            <HomeOutline size={30} color={AppTheme.primary}/>
    } else if (route.name === Destination.Search.route) {
        icon = focused ? <SearchSolid size={30} color={AppTheme.secondary}/> :
            <SearchOutline size={30} color={AppTheme.primary}/>
    } else if (route.name === Destination.Settings.route) {
        icon = focused ? <SettingsSolid size={30} color={AppTheme.secondary}/> :
            <SettingsOutline size={30} color={AppTheme.primary}/>
    }

    return (
        <View
            style={{
                alignItems: 'center',
            }}
        >
            {icon}
        </View>
    )
}

/**
 * @param route - the Route<> that this label is referring to.
 * @param focused - Whether that label is in focus mode or not.
 */
function bottomBarLabels(route: Route<any>, focused: boolean) {
    let label: ReactNode;

    if (route.name === Destination.Discover.route) {
        label = focused ?
            <Text style={{color: AppTheme.secondary}}>{Destination.Discover.route}</Text> :
            <Text style={{color: AppTheme.primary}}>{Destination.Discover.route}</Text>
    } else if (route.name === Destination.Search.route) {
        label = focused ?
            <Text style={{color: AppTheme.secondary}}>{Destination.Search.route}</Text> :
            <Text style={{color: AppTheme.primary}}>{Destination.Search.route}</Text>
    } else if (route.name === Destination.Settings.route) {
        label = focused ?
            <Text style={{color: AppTheme.secondary}}>{Destination.Settings.route}</Text> :
            <Text style={{color: AppTheme.primary}}>{Destination.Settings.route}</Text>
    }
    return label;
}

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName={Destination.Discover.route}
            screenOptions={({route}) => ({
                tabBarShowLabel: true,
                headerShown: false,
                headerStyle: {
                    backgroundColor: AppTheme.neutral,
                },
                tabBarIcon: ({focused}) => bottomBarIcons(route, focused),
                tabBarLabel: ({focused}) => bottomBarLabels(route, focused),
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 5,
                },
            })}

        >
            <Tab.Screen name={Destination.Discover.route} component={HomeScreen}/>
            <Tab.Screen name={Destination.Search.route} component={SearchScreen}/>
            <Tab.Screen name={Destination.Settings.route} component={SettingsScreen}/>
        </Tab.Navigator>
    )
}

/**
 * The entry point of our app which contains all screens.
 */
export function AppNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" options={{headerShown: false}} component={BottomTabs}/>
                <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen}/>
                <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen}/>
                <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
