import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MontserratText = ({children, style}) => {
  return (
    <Text style={{...styles.textMonserrat, ...style}}>{children}</Text>
  )
}

export default MontserratText

const styles = StyleSheet.create({
    textMonserrat : {
        fontFamily : "Montserrat"
    }
})