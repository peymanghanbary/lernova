import React from 'react'
import { Dimensions, StyleSheet, Text } from 'react-native'

const {width}=Dimensions.get('window')
export default HeaderTitle=React.memo((props)=>{

    return (
        <Text style={styles.title}>{props.children}</Text>
    )
})

const styles=StyleSheet.create({
    title:{
        fontSize:18,
        width:width-30,
        position:'absolute',
        left:0,
        flex:1,
        textAlign:'center',
        fontWeight:'800',
        color:'#3a57bc'
    }
})