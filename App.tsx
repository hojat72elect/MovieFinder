import MovieAppNavigation from "./src/MovieAppNavigation";
import {LogBox} from "react-native";

export default function App() {

    LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]);

    return (
        <MovieAppNavigation/>
    );
}
