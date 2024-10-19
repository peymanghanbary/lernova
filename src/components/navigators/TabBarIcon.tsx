import React from 'react'
import { Image } from 'react-native'


export default TabBarIcon=React.memo(({source})=>{
    return (
        <Image source={source} style={{width:20,height:20}}/>
    )
})