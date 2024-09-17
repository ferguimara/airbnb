import { View } from 'react-native'
import React, { useMemo, useState } from 'react'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import listingsData from '@/assets/data/airbnb-listings.json'
import ListingsMap from '@/components/ListingsMap'
import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import { Stack } from 'expo-router'
import ExploreHeader from '@/components/ExploreHeader'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Index = () => {
    const items = useMemo(() => listingsData as any, [])
    const geoItems = useMemo(() => listingsDataGeo, [])
    const [category, setCategory] = useState('Tiny homes');
    
    const onDataChanged = (category: string) => {
        setCategory(category)
    }

    return (
    <GestureHandlerRootView>
        <View style={{ flex: 1, marginTop: 80 }}>
            <Stack.Screen 
                options={{
                    header: () => <ExploreHeader onCategoryChanged={onDataChanged}/>,
                }}
            />
            {/* <Listings listings={items} category={category}/> */}
            <ListingsMap listings={geoItems}/>
            <ListingsBottomSheet listings={items} category={category} />
        </View>
    </GestureHandlerRootView>
  );
};

export default Index;