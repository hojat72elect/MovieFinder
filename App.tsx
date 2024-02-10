import {LogBox} from "react-native";
import {AppNavigation} from "./src/AppNavigation";

export default function App() {

    LogBox.ignoreLogs(["ViewPropTypes will be removed from React Native, along with all other PropTypes. We recommend that you migrate away from PropTypes and switch to a type system like TypeScript. If you need to continue using ViewPropTypes, migrate to the 'deprecated-react-native-prop-types' package."]);

    return (
        <AppNavigation/>
    );
}
