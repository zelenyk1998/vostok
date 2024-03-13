import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import LegalEntityNavigationTabs from "../Elements/LegalEntityNavigationTabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "./config.js";
import { useTranslation } from "react-i18next";
import "../localization/i18n";

const LegalEntityScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [card, setCard] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const { t } = useTranslation();

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };
  const openFuel = () => {
    setShowQRCode(true);
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.containerImg}>
            </View>
            {showQRCode ? (
              <TouchableOpacity style={styles.qrCode} onPress={toggleQRCode}>
                <QRCode
                  value={card.serial_external}
                  size={195}
                  backgroundColor="white"
                />
                <Text style={styles.qrText}>pin-code: 234234</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={openFuel}>
               <View style={styles.card}>
               <LinearGradient
                      locations={[0,0.6,0.5]}
                      colors={["white", "#3bb452"]}
                      style={styles.linearGradient}
                    >
                  <View style={styles.cardTop}>
                    <Image
                      source={require("../assets/images/VostokGaz.png")}
                      style={styles.imageCard}
                    />
                  </View>
                  <View style={styles.cardButtom}>
                    
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={styles.cardText}>
                          {t("CardScreen.fuelCard")}
                        </Text>
                        <Text style={styles.cardNumber}>32525245</Text>
                      </View>
                      <View style={styles.balanceText}>
                        <Text
                          style={{
                            justifyContent: "flex-start",
                            marginLeft: "5%",
                            fontSize: 17,
                            fontWeight: "700",
                            color: "black",
                            fontFamily: "Inter",
                          }}
                        >
                          {t("CardScreen.balance")}
                        </Text>
                        <Text
                          style={{
                            justifyContent: "flex-end",
                            marginRight: "5%",
                            fontSize: 17,
                            fontWeight: "700",
                            fontFamily: "Inter",
                            color: "black",
                          }}
                        >
                          2143123 {t("CardScreen.currencyBalance")}
                        </Text>
                      </View>
                  </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.bottomContainer}>
            <LegalEntityNavigationTabs />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LegalEntityScreen;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "column",
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  topContainer: {
    width: "100%",
    height: "90%",
    marginTop: "5%",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    height: "10%",
    backgroundColor: "#F5F5F5",
  },
  containerImg: {
    alignItems: "center",
    resizeMode: "contain",
    top: 26,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  logoLoginScreen: {
    width: 220,
    height: 59,
    resizeMode: "contain",
  },
  card: {
    width: "90%",
    height: 220,
    overflow: "hidden",
    position: "relative",
    left: "5.5%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#3bb452",
  },
  cardTop: {
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  cardButtom: {
    width: "100%",
    flex: 1,
  },
  linearGradient: {
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  imageCard: {
    marginTop: "5%",
    width: 200,
    height: 51.08,
    resizeMode: "contain",
  },
  textCard: {
    marginTop: "1%",
    width: "50%",
    height: "20%",
    resizeMode: "contain",
  },
  cardText: {
    marginTop: "2%",
    fontWeight: "500",
    fontSize: 16,
    color: "black",
  },
  cardNumber: {
    fontWeight: "400",
    fontSize: 14,
    color: "black",
  },
  balanceText: {
    marginTop: "7%",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  qrCode: {
    alignItems: "center",
    marginTop: 20,
  },
  qrText: {
    marginTop: "2%",
    color: "black",
    fontWeight: "500",
  },
});
