import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CardScreen,
  ProfileScreen,
  SettingScreen,
  HistoryScreen,
  PartnersScreen,
  RegisterScreen,
  RefillScreen,
  LegalEntityScreen,
  ChangingPinScreen,
  LoginScreen,
  MenuScreen,
  LegalEntityMenuScreen,
  SupportScreen,
  ExitScreen,
  LegalEntityExitScreen,
  ConfirmationScreen,
  OtpScreen,
  LoaderScreen,
  ResetPasswordScreen,
  ConfirmResetOTPScreen,
  ConfirmationResetScreen,
  ChangePinScreen,
  ChangePassword,
  SwitchAccountScreen,
} from "./src/screens/index.js";
import Config from "./src/screens/config.js";
import { useTranslation } from "react-i18next";
import "./src/localization/i18n";

const Stack = createNativeStackNavigator();

const App = () => {
  const { t } = useTranslation();
  const [authToken, setAuthToken] = useState(null);
  const [currentEntity, setCurrentEntity] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (!token) {
        setAuthToken("placeholder_token");
        setIsLoading(false);
      } else {
        setAuthToken(token);
        axios
          .post(
            `${Config.baseUrl}/client/auth/checkAuth`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            },
          )
          .then((res) => {
            if (res.status === 200) {
              axios
                .post(
                  `${Config.baseUrl}/client/graphql`,
                  {
                    query: "{self {entity, first_name}}",
                    variables: {},
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                .then(async (res) => {
                  const {
                    data: {
                      data: { self },
                    },
                  } = res;

                  setCurrentEntity(self.entity);
                  setIsLoading(false);
                })
                .catch(() => {
                  AsyncStorage.removeItem("token").then(() => {
                    setIsLoading(false);
                    Alert.alert(t("Session.session"), t("Session.finished"));
                    setAuthToken(null);
                  });
                });
            }
          })
          .catch(() => {
            AsyncStorage.removeItem("token").then(() => {
              setIsLoading(false);
              Alert.alert(t("Session.session"), t("Session.finished"));
              setAuthToken(null);
            });
          });
      }
    });
  }, []);

  if (isLoading) {
    return <LoaderScreen />;
  }

  let initialScreenName;

  if (authToken && currentEntity === 1) {
    initialScreenName = "CardScreen";
  } else if (authToken && currentEntity === 2) {
    initialScreenName = "LegalEntity";
  } else {
    initialScreenName = "Login";
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialScreenName}
        screenOptions={{
          headerShown: false,
          orientation: "portrait",
        }}
      >
        <Stack.Screen name="CardScreen" component={CardScreen} />
        <Stack.Screen name="Refill" component={RefillScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Settings" component={ChangingPinScreen} />
        <Stack.Screen name="Partners" component={PartnersScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="OTPScreen" component={OtpScreen} />
        <Stack.Screen name="LegalEntity" component={LegalEntityScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ChangePinCode" component={ChangePinScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="SwitchAccount" component={SwitchAccountScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen
          name="ConfirmResetOTP"
          component={ConfirmResetOTPScreen}
        />
        <Stack.Screen
          name="LegalEntityMenu"
          component={LegalEntityMenuScreen}
        />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Exit">
          {(props) => {
            return <ExitScreen {...props} setAuthToken={setAuthToken} />;
          }}
        </Stack.Screen>
        <Stack.Screen name="LegalEntityExit">
          {(props) => {
            return (
              <LegalEntityExitScreen {...props} setAuthToken={setAuthToken} />
            );
          }}
        </Stack.Screen>
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen
          name="ConfirmationReset"
          component={ConfirmationResetScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
