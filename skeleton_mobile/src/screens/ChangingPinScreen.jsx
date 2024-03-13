import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import AntIcon from "react-native-vector-icons/AntDesign";
import NavigationTabs from "../Elements/NavigationTabs";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Config from "./config.js";
import "../localization/i18n";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangingPinScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const openChangePass = () => {
    navigation.navigate("ChangePassword");
  };

  const openChangePin = () => {
    navigation.navigate("ChangePinCode");
  };
  const openExit = () => {
    navigation.navigate("Exit");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.containerBrands}>
          <View style={styles.containerImg}>
            <Image
              source={require("../assets/images/VostokGaz.png")}
              style={styles.logoLoginScreen}
            />
          </View>
          <View style={styles.menuList}>
            <TouchableOpacity style={styles.list} onPress={openChangePass}>
              <Icon
                name="user"
                size={28}
                color="#18aa5e"
                marginLeft="4%"
                justifyContent="space-between"
              />
              <Text style={styles.listText}>
                {t("SettingsScreen.savePassword")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.list} onPress={openChangePin}>
              <Icon
                name="credit-card"
                size={28}
                color="#18aa5e"
                marginLeft="4%"
                justifyContent="space-between"
              />
              <Text style={styles.listText}>{t("SettingsScreen.savePin")}</Text>
            </TouchableOpacity>
            <View style={styles.lineStyle} />
            <View style={styles.exitContainer}>
              <TouchableOpacity style={styles.exit} onPress={openExit}>
                <Icon
                  name="door-open"
                  size={28}
                  color="#636363"
                  marginRight="5%"
                  justifyContent="space-between"
                />
                <Text style={styles.exitText}>{t("MenuScreen.exit")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <NavigationTabs />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangingPinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerBrands: {
    backgroundColor: "white",
    alignItems: "center",
    height: "90%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    height: "10%",
    backgroundColor: "#F5F5F5",
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  logoLoginScreen: {
    width: 220,
    height: 59,
    resizeMode: "contain",
  },
  containerImg: {
    resizeMode: "contain",
    top: 26,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  menuList: {
    height: "40%",
    width: "90%",
    top: "0.5%",
  },
  list: {
    flexDirection: "row",
    top: "5%",
    alignItems: "center",
    padding: "5%",
  },
  listText: {
    color: "#222222",
    marginLeft: "5%",
    top: "0.5%",
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: 14,
  },
  lineStyle: {
    borderWidth: 0.7,
    borderColor: "rgba(226, 226, 226, 1)",
    width: "85%",
    margin: 10,
    top: "10%",

    marginLeft: "7%",
  },
  exit: {
    marginLeft: "10%",
    flexDirection: "row",
    top: "10%",
    alignItems: "center",
    padding: "5%",
  },
  exitContainer: {
    height: "30%",
    marginTop: "5%",
    marginRight: "30%",
  },
  exitText: {
    color: "#222222",
    top: "1%",
    fontWeight: "300",
    fontSize: 14,
  },
});
