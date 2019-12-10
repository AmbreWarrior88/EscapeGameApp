import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapCard from "../Components/MapCard.js";
import ImageLoad from "react-native-image-placeholder";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/core";
import Axios from "axios";

const EscapeScreen = () => {
  const navigation = useNavigation();
  const [isDescriptionDisplayed, setIsDescriptionDisplayed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [escapeRoom, setEscapeRoom] = useState({});

  const obj = useRoute();
  const params = obj.params;
  const escapeId = params.escapeGamesId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/" + escapeId);

        setEscapeRoom(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView>
      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Ionicons name="ios-arrow-back" size={30} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorite");
          }}
        >
          <Ionicons name="ios-star-outline" size={30} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* PICTURES */}

      <View style={{ flexDirection: "row" }}>
        <ImageLoad
          style={{ height: 180, flex: 4 }}
          source={{ uri: escapeRoom.pictures }}
        />

        <View style={{ marginLeft: 1, flex: 1, height: 180 }}>
          <ImageLoad
            source={{ uri: escapeRoom.pictures }}
            style={{ flex: 1, width: "100%", marginBottom: 1 }}
          />
          <ImageLoad
            source={{ uri: escapeRoom.pictures }}
            style={{ flex: 1, width: "100%" }}
          />
        </View>
      </View>

      {/* CAPTION */}

      <View style={styles.bottomBar}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Text style={{ fontSize: 20 }}>{escapeRoom.title}</Text>
          <View style={styles.ringItem}>
            <View style={styles.boxRingItem}>
              <Ionicons name="ios-cog" size={50} color={"green"} />
            </View>
          </View>
        </View>

        <Ionicons name="ios-star" size={20} color={"#D9AF62"} />
        <View style={styles.bottomBarText}>
          <Text>
            <Ionicons name="ios-hourglass" size={20} color={"green"} />
            {escapeRoom.name}
          </Text>
          <Text>0,44 km</Text>
        </View>
      </View>

      {/* FONCTION BAR */}

      <View style={styles.fonctionBar}>
        <TouchableOpacity style={styles.items}>
          <Ionicons name="ios-create" size={30} color={"#736A62"} />
          <Text style={styles.item}>Ajouter un avis</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}>
          <Ionicons name="ios-camera" size={30} color={"#736A62"} />
          <Text style={styles.item}>Ajouter une photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.items}>
          <Ionicons name="ios-call" size={30} color={"#736A62"} />
          <Text style={styles.item}>Appeler</Text>
        </TouchableOpacity>
      </View>

      {/* DESCRIPTION */}

      <View>
        <Text
          style={{ margin: 10 }}
          onPress={() => {
            setIsDescriptionDisplayed(!isDescriptionDisplayed);
          }}
          numberOfLines={isDescriptionDisplayed === false ? 3 : 0}
        >
          {escapeRoom.description}
        </Text>
      </View>

      {/* MAP */}

      <View>
        <MapCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#A69C94",
    height: 100,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingLeft: 20,
    paddingRight: 20
  },
  bottomBar: {
    backgroundColor: "#A69C94",
    height: 100,
    padding: 10
  },
  bottomBarText: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ringItem: {
    marginRight: 10,
    marginTop: -40,
    backgroundColor: "#A69C94",
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 2,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  boxRingItem: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  fonctionBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    borderBottomColor: "#A69C94",
    borderBottomWidth: 2
  },
  item: {
    fontSize: 15,
    color: "#736A62",
    fontWeight: "bold"
  },
  items: {
    alignItems: "center",
    flex: 1,
    marginBottom: 20
  }
});

export default EscapeScreen;
