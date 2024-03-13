import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import NavigationTabs from "../Elements/NavigationTabs";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { useTranslation } from "react-i18next";
import Config from "./config.js";
import "../localization/i18n";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ stella }) => {
  
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: "35%",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "30%",
            alignItems: "flex-start",
            fontFamily: "Raleway",
            fontWeight: "500",
            color: "black",
            justifyContent: "center",
          }}
        >
          <Text style={styles.name}>{stella.name}</Text>
        </View>
        <View
          style={{
            width: "25%",
            alignItems: "center",
            fontFamily: "Raleway",
            fontWeight: "500",
            color: "black",
            justifyContent: "center",
          }}
        >
          <Text style={styles.cost}>{stella.regular_price / 100}</Text>
        </View>
        <View
          style={{
            width: "25%",
            alignItems: "flex-end",
            fontFamily: "Raleway",
            fontWeight: "500",
            color: "#18aa5e",
            justifyContent: "center",
          }}
        >
          <Text style={styles.costDi}>{stella.discount_price / 100}</Text>
        </View>
        <View
          style={{
            width: "20%",
            alignItems: "flex-end",
            fontFamily: "Raleway",
            fontWeight: "500",
            color: "#18aa5e",
            justifyContent: "center",
          }}
        >
          <Text style={styles.discount}>
            {(stella.regular_price - stella.discount_price) / 100}
          </Text>
        </View>
      </View>
      <View style={styles.lineStyle} />
    </ScrollView>
  );
};

const CardScreen = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const { t } = useTranslation();
  const [showQRCode, setShowQRCode] = useState(false);
  const [balance, setBalance] = useState("1234");
  const [stellaPrice, setStellaPrice] = useState([]);
  const [card, setCard] = useState("5423434");

  

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };
  const openFuel = () => {
    setShowQRCode(true);
  };

  const navigation = useNavigation();

  const openPartners = () => {
    navigation.navigate("Partners");
  };
  const openTopup = () => {
    navigation.navigate("Refill");
  };

  const renderItem = ({ item }) => <Item stella={item} />;

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
                  value={card?.serial_external}
                  size={193}
                  backgroundColor="white"
                />
                <Text style={styles.qrText}>pin-code: 12314</Text>
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
                          {balance} {t("CardScreen.currencyBalance")}
                        </Text>
                      </View>
                    
                  </View>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            )}
            <View style={styles.buttonCard}>
              <TouchableOpacity style={styles.topup} onPress={openTopup}>
                <Text style={styles.topupText}>{t("CardScreen.topUp")}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.partner} onPress={openPartners}>
                <Text style={styles.partnerText}>
                  {t("CardScreen.partners")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.middleContainer}>
              <Text style={styles.fuelPrices}>
                {t("CardScreen.fuelPrices")}
              </Text>
              <Text style={styles.priceSer}>
                * вказана середня ціна в мережі АЗС по Україні
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    width: "98%",
                    marginTop: "5%",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      alignItems: "flex-start",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      color: "black",
                      marginLeft: "5%",
                    }}
                  >
                    {t("CardScreen.type")}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignItems: "center",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {t("CardScreen.not_disc")}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignItems: "flex-end",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      color: "black",
                    }}
                  >
                    {t("CardScreen.disc")}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      alignItems: "flex-end",
                      fontFamily: "Raleway",
                      fontWeight: "500",
                      color: "black",
                      marginRight: "5%",
                    }}
                  >
                    {t("CardScreen.discount")}
                  </Text>
                </View>
                <View style={styles.lineStyle} />
              </View>
              <View style={styles.containerr}>
                <FlatList
                  data={stellaPrice}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <NavigationTabs />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardScreen;

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
  },
  middleContainer: {
    width: "100%",
    height: "50%",
    marginTop: 30,
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
    height: 29,
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
    alignItems: "center",
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
  buttonCard: {
    flexDirection: "row",
    top: "5%",
  },
  topup: {
    width: "42%",
    height: "100%",
    marginLeft: "5%",
    padding: "3%",
    backgroundColor: "#3bb452",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3bb452",
  },
  topupText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  partner: {
    width: "42%",
    height: "100%",
    marginLeft: "5%",
    padding: "3%",
    backgroundColor: "white",
    borderColor: "#3bb452",
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: "rgba(24, 170, 94, 0.2)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 5,
  },
  partnerText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#3bb452",
    textAlign: "center",
  },
  fuelPrices: {
    textAlign: "center",
    fontFamily: "Raleway",
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  containerr: {
    width: "100%",
    flex: 1,
    padding: 16,
    flexDirection: "column",
  },

  item: {
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "black",
  },
  name: {
    textAlign: "center",
    fontSize: 15,
    width: "50%",
    height: "30%",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    color: "black",
    marginLeft: "10%",
    marginTop: "15%",
  },

  cost: {
    textAlign: "center",
    alignItems: "center",
    height: "30%",
    width: "50%",
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
    color: "black",
    textDecorationLine: "line-through",
    marginRight: "40%",
    marginTop: "15%",
  },
  costDi: {
    textAlign: "center",
    alignItems: "center",
    height: "30%",
    width: "50%",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
    color: "#3bb452",
    marginRight: "45%",
    marginTop: "15%",
  },
  discount: {
    textAlign: "center",
    alignItems: "center",
    height: "30%",
    width: "50%",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "right",
    flex: 1,
    color: "#3bb452",
    marginRight: "30%",
    marginTop: "15%",
  },

  qrCode: {
    alignItems: "center",
  },
  qrText: {
    color: "black",
    marginTop: "2%",
  },
  lineStyle: {
    borderWidth: 0.7,
    borderColor: "rgba(226, 226, 226, 1)",
    width: "100%",
    marginTop: "7%",
  },
  priceSer: {
    textAlign: "center",
    fontFamily: "Raleway",
    fontSize: 10,
    fontWeight: "bold",
    color: "#3bb452",
    marginTop: "2%",
  },
});
