import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'

const ModalHeaderText = () => {
    const [active, setActive] = useState(0)

    return (
        <View style={{flexDirection: 'row', justifyContent: 'center', gap: 10}}>
            <TouchableOpacity onPress={() => setActive(0)}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: active === 0 ? 'bold': 'normal',
                    color: active === 0 ? '#000' : Colors.grey,
                    textDecorationLine: active === 0 ? 'underline' : 'none'
                }}>
                    Stays
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActive(1)}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: active === 1 ? 'bold': 'normal',
                    color: active === 1 ? '#000' : Colors.grey,
                    textDecorationLine: active === 1 ? 'underline' : 'none'
                }}>
                    Experiences
                </Text>
            </TouchableOpacity>
        </View>
  )
}

export default ModalHeaderText