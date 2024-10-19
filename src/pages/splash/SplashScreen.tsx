import { View,StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen() {

  return (
    <LinearGradient colors={['#a279f2', '#929cee', '#83bfea','#72e3e5']} style={styles.linearGradient}>

      <View style={styles.container}>

        <Text style={styles.companyName}>Lernova</Text>
        <Text style={styles.loading}>Loading...</Text>

        <Text style={styles.version}>version 0.0.1</Text>
      </View>

    </LinearGradient>

  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  version: {
    color:'#fff',
    textTransform:'uppercase',
    fontWeight:'800',
    marginTop:20,
    position:'absolute',
    bottom:100,
  },
  companyName:{
    color:'#fff',
    textTransform:'uppercase',
    fontWeight:'800',
    fontSize:24
  },
  loading:{
    color:'#fff',
    textTransform:'uppercase',
    fontWeight:'800',
    marginTop:20
  }
});