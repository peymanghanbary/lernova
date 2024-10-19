import HomeScreen from '../pages/home/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../components/navigators/TabBarIcon';
import HeaderTitle from '../components/navigators/HeaderTitle';
import { images } from '../utility/constants/global';
import SettingsScreen from '../pages/setting/SettingsScreen';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
export default function RootNavigator() {

  const {t}=useTranslation()

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name={t("screens.memoryGame")} 
        component={HomeScreen} 
        options={{tabBarIcon:()=><TabBarIcon source={images.tabbar.dashboard}/>}}
      />
      <Tab.Screen 
        name={t("screens.settings")} 
        component={SettingsScreen} 
        options={{tabBarIcon:()=><TabBarIcon source={images.tabbar.dashboard}/>}}
      />
    </Tab.Navigator>
  );

}
