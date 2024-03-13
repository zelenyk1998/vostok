import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign";
import NavigationTabs from "../Elements/NavigationTabs";
import { useTranslation } from "react-i18next";
import "../localization/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from "prop-types";

const ExitScreen = ({ navigation, setAuthToken }) => {
  const { t } = useTranslation();
  const openLogin = () => {
    AsyncStorage.removeItem("token").then(async () => {
      await AsyncStorage.removeItem("cardInfo");
      setAuthToken("");
      return navigation.navigate("Login");
    });
  };

  const openMenu = () => {
    return navigation.navigate("CardScreen");
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
          <View style={styles.exitTextContainer}>
            <Text style={styles.exitText}>{t("ExitScreen.exitText")}</Text>
          </View>
          <View style={styles.buttonCard}>
            <TouchableOpacity style={styles.exit} onPress={openLogin}>
              <Text style={styles.exitsText}>{t("ExitScreen.exit")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.notExit} onPress={openMenu}>
              <Text style={styles.notExitText}>{t("ExitScreen.notExit")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <NavigationTabs />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExitScreen;

ExitScreen.propTypes = {
  setAuthToken: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  containerBrands: {
    backgroundColor: "white",
    color: "#3bb452",
    height: "90%",
    paddingTop: 20,
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
  containerImg: {
    resizeMode: "contain",
    marginLeft: "15%",
    marginBottom: 40,
    paddingHorizontal: 20,
    height: "5%",
  },
  logoLoginScreen: {
    marginTop: "5%",
    width: 220,
    height: 59,
    resizeMode: "contain",
  },
  exitTextContainer: {
    height: "10%",
    width: "80%",
    alignItems: "center",

    marginLeft: "10%",
    marginTop: "17%",
  },
  exitText: {
    color: "#222222",
    alignItems: "center",
    fontWeight: "700",

    fontSize: 20,
    textAlign: "center",
  },
  buttonCard: {
    flexDirection: "row",
    top: "14%",
    width: "98%",
    textAlign: "center",
    alignItems: "center",
    height: "7%",
    justifyContent: "space-between",
    paddingHorizontal: "1%",
  },
  exit: {
    width: "49%",
    height: "100%",
    marginLeft: "3%",
    justifyContent: "center",
    padding: "2%",
    backgroundColor: "#3bb452",
    borderRadius: 6,
    borderWidth: 1,
    textAlign: "center",
    alignItems: "center",
    borderColor: "#3bb452",
  },
  exitsText: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    alignItems: "center",
  },
  notExit: {
    width: "44%",
    height: "100%",
    marginLeft: "3%",
    padding: "3%",
    backgroundColor: "white",
    alignItems: "center",
    borderColor: "green",
    justifyContent: "center",
    borderWidth: 1,
    textAlign: "center",
    borderRadius: 6,
    shadowColor: "rgba(24, 170, 94, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  notExitText: {
    color: "#3bb452",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
});
