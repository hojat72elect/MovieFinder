import {Text, View} from "react-native";
import {SettingsSectionItem} from "./SettingsSectionItem";
import {AppTheme} from "../shared/AppTheme";


export const SettingsScreen = () => {

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white'
        }}>
            <View
                style={{
                    paddingVertical: 12,
                    paddingHorizontal: 14,

                }}
            >
                <Text style={{
                    color: AppTheme.secondary,
                    fontWeight: '500',
                    letterSpacing: 0.6,
                }}>General</Text>
                <SettingsSectionItem title="Theme" description="Light"/>
                <SettingsSectionItem title="Language" description="English"/>
            </View>

            <View
                style={{
                    backgroundColor: AppTheme.neutral,
                    height: 30,
                }}
            />
            <View style={{
                paddingTop: 12,
                paddingHorizontal: 14,
            }}>
                <Text style={{
                    color: AppTheme.secondary,
                    fontWeight: '500',
                    letterSpacing: 0.6,
                    paddingTop: 8,
                }}>About</Text>
                <SettingsSectionItem title="Source Code" description="View MovieFinder's source code"/>
                <SettingsSectionItem title="Version" description="v1.3.0 release"/>
                <SettingsSectionItem title="Privacy Policy" description="View MovieFinder's privacy policies"/>

            </View>

        </View>

    )
}
