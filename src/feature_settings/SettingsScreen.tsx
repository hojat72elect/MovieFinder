import {Button, Linking, Modal, Text, TouchableOpacity, View} from "react-native";
import {SettingsSectionItem} from "./SettingsSectionItem";
import {AppTheme} from "../shared/AppTheme";
import {BuildInfoDataSource} from "./BuildInfoDataSource";
import {useState} from "react";

export const SettingsScreen = () => {

    // whether to show the theme dialog or not.
    const [isThemeDialogVisible, setIsThemeDialogVisible] = useState(false);

    // Whether to show the language dialog or not.
    const [isLanguageDialogVisible, setIsLanguageDialogVisible] = useState(false);

    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: 'white',
            paddingTop: 15,
        }}>

            {/*Default UI of the page*/}
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

                <TouchableOpacity onPress={() => {
                    console.log("User wants to see theme dialog");
                    // toggle theme dialog's visibility
                    setIsThemeDialogVisible(!isThemeDialogVisible);
                }}>
                    <SettingsSectionItem title="Theme" description="Light"/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    console.log("User wants to see language dialog");
                    // toggle language dialog's visibility
                    setIsLanguageDialogVisible(!isLanguageDialogVisible);
                }}>
                    <SettingsSectionItem title="Language" description="English"/>
                </TouchableOpacity>

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
                <TouchableOpacity onPress={() => {
                    console.log("User wants to go to source code");
                    Linking.openURL("https://github.com/hojat72elect/MovieFinder");
                }}>
                    <SettingsSectionItem title="Source Code" description="View MovieFinder's source code"/>
                </TouchableOpacity>

                <SettingsSectionItem title="Version"
                                     description={`${BuildInfoDataSource.versionNumber} - ${BuildInfoDataSource.environment}`}/>
                <SettingsSectionItem title="Privacy Policy" description="View MovieFinder's privacy policies"/>

            </View>

            {/* The theme dialog */}
            <Modal visible={isThemeDialogVisible} animationType="fade" transparent={true}>
                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: '100%',
                        maxWidth: 300,
                        margin: 48,
                        elevation: 24,
                        borderRadius: 2,
                        backgroundColor: '#fff'
                    }}>
                        <Text style={{
                            margin: 24,
                            fontWeight: "bold",
                            fontSize: 24,
                            color: "#000"
                        }}>Change Theme</Text>
                        <Text style={{
                            marginLeft: 24,
                            marginRight: 24,
                            marginBottom: 24,
                            fontSize: 16,
                            color: "#000"
                        }}>Here you should be able to select your desired theme from a group of radio buttons.</Text>
                        <View style={{
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 8,
                            marginLeft: 24,
                            padding: 10,
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "flex-end"
                        }}>
                            <View style={{
                                marginTop: 12,
                                marginRight: 8,
                                width: 100
                            }}>
                                <Button title="OK" onPress={() => setIsThemeDialogVisible(!isThemeDialogVisible)}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>

            {/*The language dialog*/}
            <Modal visible={isLanguageDialogVisible} animationType="fade" transparent={true}>
                <View style={{
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: '100%',
                        maxWidth: 300,
                        margin: 48,
                        elevation: 24,
                        borderRadius: 2,
                        backgroundColor: '#fff'
                    }}>
                        <Text style={{
                            margin: 24,
                            fontWeight: "bold",
                            fontSize: 24,
                            color: "#000"
                        }}>Change Language</Text>
                        <Text style={{
                            marginLeft: 24,
                            marginRight: 24,
                            marginBottom: 24,
                            fontSize: 16,
                            color: "#000"
                        }}>Here you should be able to select a language from a group of radio buttons.</Text>
                        <View style={{
                            marginTop: 0,
                            marginRight: 0,
                            marginBottom: 8,
                            marginLeft: 24,
                            padding: 10,
                            display: "flex",
                            flexDirection: 'row',
                            justifyContent: "flex-end"
                        }}>
                            <View style={{
                                marginTop: 12,
                                marginRight: 8,
                                width: 100
                            }}>
                                <Button title="OK"
                                        onPress={() => setIsLanguageDialogVisible(!isLanguageDialogVisible)}/>
                            </View>
                        </View>
                    </View>
                </View>


            </Modal>

        </View>

    )
}
