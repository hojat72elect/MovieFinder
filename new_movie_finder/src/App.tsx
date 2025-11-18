import {Redirect, Route} from 'react-router-dom';
import {
    IonApp,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {HomeScreen} from './feature_home/HomeScreen';
import {Tab2} from './pages/Tab2';
import {Tab3} from './pages/Tab3';
import '@ionic/react/css/core.css'; // Core CSS required for Ionic components to work properly
import {HomeIcon, HeartIcon, Cog6ToothIcon} from '@heroicons/react/24/outline';

// Basic CSS for apps built with Ionic
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

// Optional CSS utils
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

export const App = () => (
    <IonApp>
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route exact path="/tab1">
                        <HomeScreen/>
                    </Route>
                    <Route exact path="/tab2">
                        <Tab2/>
                    </Route>
                    <Route path="/tab3">
                        <Tab3/>
                    </Route>
                    <Route exact path="/">
                        <Redirect to="/tab1"/>
                    </Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                        <HomeIcon height={36} width={36}/>
                        <IonLabel>Discover</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                        <HeartIcon height={36} width={36}/>
                        <IonLabel>Likes</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <Cog6ToothIcon height={36} width={36}/>
                        <IonLabel>Settings</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    </IonApp>
);
