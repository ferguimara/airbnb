import { defaultStyles } from '@/constants/Styles';
import { ListingGeo } from '@/interfaces/listingGeo';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapView from 'react-native-map-clustering';
import * as Location from 'expo-location';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };

const ListingsMap = ({ listings }: Props) => {
    const router = useRouter()
    const mapRef = useRef<any>(null);

    // When the component mounts, locate the user
    useEffect(() => {
        onLocateMe();
    }, []);
    
    const onMarkerSelected = (item: ListingGeo) => {
        router.push(`/listing/${item.properties.id}`)
    }

    // Focus the map on the user's location
    const onLocateMe = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
        return;
        }

        let location = await Location.getCurrentPositionAsync({});

        const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 7,
        longitudeDelta: 7,
        };

        mapRef.current?.animateToRegion(region);
    };

    // Overwrite the renderCluster function to customize the cluster markers
    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties } = cluster
        const points = properties.point_count

        return(
            <Marker 
                key={`cluster-${id}`}
                onPress={onPress} 
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
            >
                <View style={styles.marker}>
                    <Text style={{
                        color: '#000',
                        textAlign: 'center',
                    }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        )
    }
  
    return (
    <View style={defaultStyles.container}>
        <MapView 
            ref={mapRef}
            animationEnabled={false}
            style={StyleSheet.absoluteFill} 
            initialRegion={INITIAL_REGION}
            clusterColor='#FFF'
            clusterTextColor='#000'
            renderCluster={renderCluster}
        >
            {listings.features.map((item: ListingGeo) => (
                <Marker 
                    key={item.properties.id}
                    onPress={() => onMarkerSelected(item)}
                    coordinate={{
                        latitude: +item.properties.latitude,
                        longitude: +item.properties.longitude
                    }}
                >
                    <View style={styles.marker}>
                        <Text style={styles.markerText}>$ {item.properties.price}</Text>
                    </View>
                </Marker>
            ))}
            </MapView>
            <TouchableOpacity style={styles.locateBtn} onPress={onLocateMe}>
                <Ionicons name="navigate" size={24} color={Colors.dark} />
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    marker: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14
    },
    locateBtn: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: {
          width: 1,
          height: 10,
        },
    },
})

export default ListingsMap