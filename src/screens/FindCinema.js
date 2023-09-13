import React, { useEffect, useState } from "react";
import { Dimensions, View, StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Constants from "../Constants/Constants";
import { APIKEY_MAP, URL_MAPFIND } from "../service/config";
import BookTicketWV from "./BookTicketWV";

export default function FindCinema({ navigation }) {
  const handlePress = () => {
    navigation.navigate(BookTicketWV);
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [cinemas, setCinemas] = useState([]);
  const [radius, setRadius] = useState("10000");
  const [type, setType] = useState("CGV");

  useEffect(() => {
    requestLocationPermission();
  }, []);

  async function requestLocationPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Quyền truy cập định vị bị từ chối!");
      return;
    }
    const location = await Location.getCurrentPositionAsync({});
    setCurrentLocation(location.coords);
    searchCinemas(location.coords.latitude, location.coords.longitude);
  }

  async function searchCinemas(latitude, longitude, radius, type) {
    try {
      const response = await fetch(
        `${URL_MAPFIND}location=${latitude},${longitude}&radius=${radius}&keyword=${type}&key=${APIKEY_MAP}`
      );
      const result = await response.json();
      if (result.status === "OK") {
        setCinemas(result.results);
      } else {
        console.log("Lỗi khi tìm kiếm rạp phim:", result.status);
        // Alert.alert("No results found!")
      }
    } catch (error) {
      console.log("Lỗi khi tìm kiếm rạp phim:", error);
    }
  }
  return (
    <View style={styles.container}>
      {currentLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title={"Vị trí của bạn"}
            pinColor={"#FF0000"}
          />
          {cinemas.map((cinema) => (
            <Marker
              key={cinema.place_id}
              coordinate={{
                latitude: cinema.geometry.location.lat,
                longitude: cinema.geometry.location.lng,
              }}
              title={cinema.name}
              pinColor={"#032541"}
            />
          ))}
        </MapView>
      )}
      <View>
        <View style={styles.selectContainer}>
          <TextInput
            keyboardType="numeric"
            style={styles.inputRadius}
            placeholder="Nhập bán kính (m)"
            value={radius}
            onChangeText={setRadius}
          />
        </View>
        <Picker selectedValue={type} onValueChange={setType}>
          <Picker.Item label="CGV" value="CGVCinemas" />
          <Picker.Item label="Lotte" value="LotteCinemas" />
          <Picker.Item label="Beta" value="BetaCinemas" />
          <Picker.Item label="Galaxy" value="GalaxyCinemas" />
          <Picker.Item label="BHD Star" value="BHDStarCineplex" />
          {/* <Picker.Item label="Mega GS" value="MegaGSCinemas"/> */}
        </Picker>
        <View style={styles.selectContainer}>
          <TouchableOpacity
            style={styles.buttonFind}
            onPress={() =>
              searchCinemas(
                currentLocation.latitude,
                currentLocation.longitude,
                radius,
                type
              )
            }
          >
            <Text style={styles.textButton}>Find</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.selectContainer}>
          <TouchableOpacity style={styles.buttonFind} onPress={handlePress}>
            <Text style={styles.textButton}>Book movie tickets now !</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: deviceWidth,
    height: deviceHeight / 2,
  },
  selectContainer: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  inputRadius: {
    width: deviceWidth - 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 50,
    paddingLeft: 20,
    padding: 10,
    borderColor: Constants.barColor,
    fontSize: 20,
  },
  buttonFind: {
    width: deviceWidth - 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Constants.barColor,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: Constants.textColorWhite,
  },
});
