import {Button, Linking, Modal, Text, TouchableOpacity, View} from "react-native";
import {SettingsSectionItem} from "./SettingsSectionItem";
import {AppTheme} from "../shared/AppTheme";
import {BuildInfoDataSource} from "./BuildInfoDataSource";
import {useState} from "react";
import {RadioButton} from "react-native-paper";
import {useTranslation} from "react-i18next";

export const SettingsScreen = () => {

    // whether to show the theme dialog or not.
    const [isThemeDialogVisible, setIsThemeDialogVisible] = useState(false);

    // Whether to show the language dialog or not.
    const [isLanguageDialogVisible, setIsLanguageDialogVisible] = useState(false);

    const [currentlyChosenTheme, setCurrentlyChosenTheme] = useState('LIGHT');
    const [currentlyChosenLanguage, setCurrentlyChosenLanguage] = useState('ENG');
    const {t} = useTranslation();

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
                    // toggle theme dialog's visibility
                    setIsThemeDialogVisible(!isThemeDialogVisible);
                }}>
                    <SettingsSectionItem title={t("settings_section_theme")} description={t("theme_light")}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    // toggle language dialog's visibility
                    setIsLanguageDialogVisible(!isLanguageDialogVisible);
                }}>
                    <SettingsSectionItem title={t("settings_section_language")} description={t("language_english")}/>
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
                    Linking.openURL("https://github.com/hojat72elect/MovieFinder");
                }}>
                    <SettingsSectionItem title="Source Code" description="View MovieFinder's source code"/>
                </TouchableOpacity>

                <SettingsSectionItem title={t("settings_section_version")}
                                     description={`${BuildInfoDataSource.versionNumber} - ${BuildInfoDataSource.environment}`}/>
                <TouchableOpacity onPress={() => {
                    Linking.openURL("https://www.freeprivacypolicy.com/live/bbea1d85-ba57-4697-8804-5874d10dcf9b");
                }}>
                    <SettingsSectionItem title="Privacy Policy" description="View MovieFinder's privacy policies"/>
                </TouchableOpacity>


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
                        <View style={{
                            marginLeft: 24,
                            marginRight: 24,
                        }}>
                            <RadioButton.Group onValueChange={(newValue) => {
                                setCurrentlyChosenTheme(newValue);
                            }} value={currentlyChosenTheme}>
                                <RadioButton.Item label="Light" value="LIGHT"/>
                                <RadioButton.Item label="Dark" value="DARK"/>
                                <RadioButton.Item label="System" value="SYSTEM"/>
                            </RadioButton.Group>
                        </View>
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
                        <View style={{
                            marginLeft: 24,
                            marginRight: 24,
                        }}>
                            <RadioButton.Group onValueChange={(newValue) => {
                                setCurrentlyChosenLanguage(newValue);
                            }} value={currentlyChosenLanguage}>
                                <RadioButton.Item label="English" value="ENG"/>
                                <RadioButton.Item label="Persian" value="FA"/>
                            </RadioButton.Group>
                        </View>
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
