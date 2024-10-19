import { I18nManager, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import useThemeContext from '../../utility/hooks/useThemeContext';
import Heading from '../../components/Heading';
import BodyText from '../../components/BodyText';
import { useTranslation } from 'react-i18next';
import { LanguageNames } from '../../utility/constants/types';
import RNRestart from "react-native-restart";

export default function SettingsScreen() {
  const { colors, isSystemTheme, systemTheme, colorTheme, setColorTheme } = useThemeContext();
  const {t,i18n}=useTranslation()

  const changeLanguage=(lang:string)=>{ 
    i18n.changeLanguage(lang).then(()=>{
      I18nManager.forceRTL(i18n.dir()=='rtl');
      RNRestart.Restart()
    })
  }
  
  return (
    <View style={[styles.container,{ backgroundColor: colors.backgrounds.default }]}>
      <View style={styles.sectionHeader}>
        <Heading style={{ color: colors.text }}>{t('Dark Mode')}</Heading>
      </View>
      <View style={styles.section}>
        <BodyText style={styles.sectionTitle}>{t('System Theme')}</BodyText>
        <Switch
          trackColor={{
            false: colors.backgrounds.soft,
            true: colors.backgrounds.strong,
          }}
          ios_backgroundColor={colors.backgrounds.soft}
          thumbColor={colors.backgrounds.default}
          onValueChange={(on) => setColorTheme(on ? null : systemTheme)}
          value={isSystemTheme}
        />
      </View>
      <View style={styles.section}>
        <BodyText style={styles.sectionTitle}>{t('Dark Mode')}</BodyText>
        <Switch
          trackColor={{
            false: colors.backgrounds.soft,
            true: colors.backgrounds.strong,
          }}
          disabled={isSystemTheme}
          ios_backgroundColor={colors.backgrounds.soft}
          thumbColor={colors.backgrounds.default}
          onValueChange={(on) => setColorTheme(on ? 'dark' : 'light')}
          value={colorTheme === 'dark'}
        />
        {/* <TouchableOpacity onPress={()=>{i18n.changeLanguage("fa")}} style={{borderWidth:1,height:100,backgroundColor:'#bbb',zIndex:1000}}><Text>click</Text></TouchableOpacity> */}
      </View>

      <View style={styles.sectionHeader}>
        <Heading style={{ color: colors.text }}>{t('Language Selection')}</Heading>
      </View>

      <View style={styles.section}>
          <View style={styles.languageSelector}>
            <TouchableOpacity onPress={()=>{changeLanguage(LanguageNames.fa)}} style={[styles.languageButton,t('language')==t('farsi')?styles.activeLanguage:{}]}>
              <Text>{t('farsi')}</Text>
            </TouchableOpacity>
            <View style={styles.divider}/>
            <TouchableOpacity onPress={()=>{changeLanguage(LanguageNames.en)}} style={[styles.languageButton,t('language')==t('english')?styles.activeLanguage:{}]}>
              <Text>{t('english')}</Text>
            </TouchableOpacity>
          </View>
      </View>
      
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    paddingHorizontal:15,
    paddingVertical:15
  },
  section:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:10,
  },
  sectionHeader:{
    marginVertical:5
  },
  sectionTitle:{
    fontSize:15
  },
  languageSelector:{
    borderRadius:10,
    flex:1,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    backgroundColor:'#eee',
    overflow:'hidden',
  },
  languageButton:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical:10
  },
  divider:{
    borderWidth:0.5,
    width:1,
    borderColor:'#bbb',
    height:'75%'
  },
  activeLanguage:{
    backgroundColor:'#ffc300'
  }
})