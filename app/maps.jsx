import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";

const GOOGLE_MAPS_API_KEY = "AIzaSyBjsTQBGvot-ZEot5FG3o7S1Onjm_4woYY"; 

export default function MapsScreen({ navigation }) {
  const mapRef = useRef(null);
  const [routes, setRoutes] = useState([]);

  const markers = [

    { latitude: 31.62391261451158, longitude: -7.993668168728077, title: "Koutoubia Mosque", image: "https://static.wixstatic.com/media/894d31_cda75ba3813d441fbdd6fdba8488b828~mv2.jpg/v1/fill/w_925,h_618,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/894d31_cda75ba3813d441fbdd6fdba8488b828~mv2.jpg"},
    { latitude: 31.626005387428425, longitude: -7.98856696130073, title: "Jamaa El Fna", image: "https://www.marrakech-private-resort.com/wp-content/uploads/2019/10/place-jeema-el-fna-nuit.png" },
    { latitude: 31.63086804456602, longitude: -7.989390386791731, title: "Le Jardin Secret" , image:"https://lejardinsecretmarrakech.com/images/jardinsecret/slideshow/home-2/1401647.jpg"},
    { latitude: 31.632227435228724, longitude: -7.986270636263631, title: "Madrassa Ben Youssef", image: "https://madeincity-strapi-uploads.s3.eu-west-1.amazonaws.com/Medersa_Ben_Youssef_Une_perle_rare_dans_la_medina_668bb2f129.jpeg" },
    { latitude: 31.629006765071036, longitude: -7.987149730268813, title: "Rahba Lakdima", image: "https://media-cdn.tripadvisor.com/media/photo-s/07/d5/61/47/rahba-kedima-square.jpg" },
    { latitude: 31.62326683307254, longitude: -7.983871400299811, title: "Dar Si Said Museum", image: "https://media-cdn.tripadvisor.com/media/photo-s/01/0e/df/47/dar-si-said-museum.jpg"},
    { latitude: 31.62184373851892, longitude: -7.981984893254494, title: "Bahia Palace", image: "https://accidentallywesanderson.com/wp-content/uploads/2021/03/160291449_253320366339719_3241489000600554515_n.jpg"},
    { latitude: 31.61849670473578, longitude: -7.9858803748522265, title: "El Badi Palace", image: "https://www.villasmarrakech.com/images/magazine/article_477_2765_1562149288.jpg" },
    { latitude: 31.617565435471835, longitude: -7.988830437436161, title: "Saadian Tombs", image: "https://stayhere.ma/wp-content/uploads/2023/08/shutterstock_1996519352-1-scaled.jpg" },
    { latitude: 31.626005387428425, longitude: -7.98856696130073, title: "Jamaa El Fna", image: "https://www.marrakech-private-resort.com/wp-content/uploads/2019/10/place-jeema-el-fna-nuit.png" },

  
  ];

  useEffect(() => {
    const fetchRoutes = async () => {
      const newRoutes = [];
      for (let i = 0; i < markers.length - 1; i++) {
        const origin = `${markers[i].latitude},${markers[i].longitude}`;
        const destination = `${markers[i + 1].latitude},${markers[i + 1].longitude}`;
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`;
        
        try {
          const response = await axios.get(url);
          if (response.data.routes.length > 0) {
            const points = response.data.routes[0].overview_polyline.points;
            newRoutes.push(decodePolyline(points));
          }
        } catch (error) {
          console.error("Erreur lors de la récupération de l'itinéraire", error);
        }
      }
      setRoutes(newRoutes);
    };
    fetchRoutes();
  }, []);

  const decodePolyline = (encoded) => {
    let points = [];
    let index = 0, lat = 0, lng = 0;
    while (index < encoded.length) {
      let b, shift = 0, result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const deltaLng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }
    return points;
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 31.6295,
          longitude: -7.9811,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {markers.map((marker, index) => (
          <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }} title={marker.title}>
            <Image source={{ uri: marker.image }} style={{ width: 40, height: 40, borderRadius: 25 }} />
          </Marker>
        ))}
        {routes.map((route, index) => (
          <Polyline key={index} coordinates={route} strokeColor="purple" strokeWidth={6} />
        ))}
      </MapView>
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
