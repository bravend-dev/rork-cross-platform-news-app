import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { AuthProvider } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { theme } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTitleStyle: {
    color: theme.colors.text,
  },
});

const statusBarStyle = "light" as const;

const stackScreenOptions = {
  headerBackTitle: "Quay lại",
  headerStyle: styles.headerStyle,
  headerTintColor: theme.colors.text,
  headerTitleStyle: styles.headerTitleStyle,
};

function RootLayoutNav() {
  return (
    <>
      <StatusBar style={statusBarStyle} backgroundColor={styles.headerStyle.backgroundColor} />
      <Stack screenOptions={stackScreenOptions}>
        <Stack.Screen name="loading" options={loadingScreenOptions} />
        <Stack.Screen name="login" options={loginScreenOptions} />
        <Stack.Screen name="service-selection" options={serviceSelectionScreenOptions} />
        <Stack.Screen name="profile-selection" options={profileSelectionScreenOptions} />
        <Stack.Screen name="create-profile" options={createProfileScreenOptions} />
        <Stack.Screen name="(tabs)" options={tabsScreenOptions} />
        <Stack.Screen name="detail/[id]" options={detailScreenOptions} />
        <Stack.Screen name="subscription" options={subscriptionScreenOptions} />
        <Stack.Screen name="add-account" options={addAccountScreenOptions} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <GestureHandlerRootView style={styles.container}>
            <RootLayoutNav />
          </GestureHandlerRootView>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

const subscriptionScreenOptions = {
  title: "Gói dịch vụ",
  presentation: "modal" as const
};

const addAccountScreenOptions = {
  title: "Thêm tài khoản",
  presentation: "modal" as const
};

const tabsScreenOptions = {
  headerShown: false
};

const detailScreenOptions = {
  headerShown: false
};

const loadingScreenOptions = {
  headerShown: false
};

const loginScreenOptions = {
  headerShown: false
};

const serviceSelectionScreenOptions = {
  headerShown: false
};

const profileSelectionScreenOptions = {
  headerShown: false
};

const createProfileScreenOptions = {
  headerShown: false,
  presentation: "modal" as const
};

