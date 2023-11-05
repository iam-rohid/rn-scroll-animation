import "react-native-gesture-handler";
import { StatusBar, setStatusBarStyle } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import FeatherIcons from "@expo/vector-icons/Feather";
import { useState } from "react";

type Balance = {
  id: string;
  balance: number;
  color: string;
  fgColor: string;
};

const balances: Balance[] = [
  {
    id: "1",
    balance: 21424,
    color: "#4f46e5",
    fgColor: "#ffffff",
  },
  {
    id: "2",
    balance: 46700,
    color: "#2563eb",
    fgColor: "#ffffff",
  },
  {
    id: "3",
    balance: 30000,
    color: "#db2777",
    fgColor: "#ffffff",
  },
  {
    id: "4",
    balance: 430802,
    color: "#e11d48",
    fgColor: "#ffffff",
  },
];

type Purchase = {
  id: number;
  title: string;
  type: string;
  price: string;
};
const purchases: Purchase[] = [
  {
    id: 1,
    title: "Amazon Echo Dot",
    type: "Amazon",
    price: "$29.99",
  },
  {
    id: 2,
    title: "Amazon Prime Membership",
    type: "Amazon",
    price: "$119",
  },
  {
    id: 3,
    title: "Netflix Subscription",
    type: "Mobile Subscription",
    price: "$12.99",
  },
  {
    id: 4,
    title: "iPhone 12 Pro",
    type: "Mobile",
    price: "$999",
  },
  {
    id: 5,
    title: "Kindle Paperwhite",
    type: "Amazon",
    price: "$149.99",
  },
  {
    id: 6,
    title: "Google Play Store Apps",
    type: "Mobile Subscription",
    price: "$5.99",
  },
  {
    id: 7,
    title: "Laptop Charger",
    type: "Electronics",
    price: "$39.99",
  },
  {
    id: 8,
    title: "Spotify Premium",
    type: "Mobile Subscription",
    price: "$9.99",
  },
  {
    id: 9,
    title: "Toilet Paper",
    type: "Household",
    price: "$4.99",
  },
  {
    id: 10,
    title: "Nike Running Shoes",
    type: "Sports",
    price: "$79.99",
  },
  {
    id: 11,
    title: "Hulu Subscription",
    type: "Mobile Subscription",
    price: "$7.99",
  },
  {
    id: 12,
    title: "Groceries",
    type: "Food",
    price: "$50",
  },
  {
    id: 13,
    title: "Smart Home Security Camera",
    type: "Electronics",
    price: "$149",
  },
  {
    id: 14,
    title: "Gym Membership",
    type: "Fitness",
    price: "$30",
  },
  {
    id: 15,
    title: "PlayStation 5",
    type: "Gaming",
    price: "$499.99",
  },
  {
    id: 16,
    title: "Ebook - The Great Gatsby",
    type: "Books",
    price: "$4.99",
  },
  {
    id: 17,
    title: "Home Decor Items",
    type: "Home",
    price: "$25",
  },
  {
    id: 18,
    title: "Car Insurance",
    type: "Insurance",
    price: "$100",
  },
  {
    id: 19,
    title: "Electricity Bill",
    type: "Utilities",
    price: "$75",
  },
  {
    id: 20,
    title: "Movie Tickets",
    type: "Entertainment",
    price: "$12.50",
  },
];

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Home />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const CARD_HEIGHT = 120;

const Home = () => {
  const dimentions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const expandMode = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y >= 80 && !expandMode.value) {
        expandMode.value = true;
        runOnJS(setStatusBarStyle)("light");
      }
      if (event.contentOffset.y < 80 && expandMode.value) {
        expandMode.value = false;
        runOnJS(setStatusBarStyle)("auto");
      }
    },
  });

  const cardScrollListStyle = useAnimatedStyle(() => ({
    top: Math.max(0, -(scrollY.value - 80)),
  }));

  const cardWrapperStyle = useAnimatedStyle(() => ({
    paddingHorizontal: interpolate(
      scrollY.value,
      [0, 80],
      [16, 0],
      Extrapolate.CLAMP
    ),
  }));

  const cardStyle = useAnimatedStyle(() => ({
    borderTopLeftRadius: interpolate(
      scrollY.value,
      [0, 80],
      [24, 0],
      Extrapolate.CLAMP
    ),
    borderTopRightRadius: interpolate(
      scrollY.value,
      [0, 80],
      [24, 0],
      Extrapolate.CLAMP
    ),

    height: interpolate(
      scrollY.value,
      [0, 80],
      [CARD_HEIGHT, CARD_HEIGHT + insets.top],
      Extrapolate.CLAMP
    ),
  }));

  return (
    <>
      <Animated.FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        data={purchases}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontWeight: "500" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 12, opacity: 0.5 }}>{item.type}</Text>
            </View>
            <Text
              style={{ fontSize: 16, fontWeight: "600", textAlign: "right" }}
            >
              {item.price}
            </Text>
          </View>
        )}
        ListHeaderComponent={() => (
          <Animated.View
            style={[
              {
                paddingTop: insets.top,
                backgroundColor: "#ffffff",
                position: "relative",
              },
            ]}
          >
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 16,
                height: 80,
                justifyContent: "flex-end",
              }}
            >
              <Text style={{ fontSize: 36, fontWeight: "800" }}>
                Hello Rohid
              </Text>
            </View>
            <View style={{ height: CARD_HEIGHT }} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                padding: 16,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <Text style={{ opacity: 0.7, fontSize: 12 }}>Filter By</Text>
                <FeatherIcons
                  name="chevron-down"
                  size={16}
                  style={{ opacity: 0.7 }}
                />
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      />
      <Animated.FlatList
        style={[
          {
            position: "absolute",
            left: 0,
            right: 0,
          },
          cardScrollListStyle,
        ]}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={balances}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            style={[
              {
                width: dimentions.width,
                height: CARD_HEIGHT + insets.top,
                justifyContent: "flex-end",
              },
              cardWrapperStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: item.color,
                  justifyContent: "flex-end",
                  padding: 16,
                  position: "relative",
                  overflow: "hidden",
                },
                cardStyle,
              ]}
            >
              <View
                style={{
                  position: "absolute",
                  width: 300,
                  height: 300,
                  borderRadius: 300,
                  backgroundColor: item.fgColor,
                  opacity: 0.1,
                  top: -60,
                  left: -100,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  marginBottom: 4,
                  color: item.fgColor,
                }}
              >
                Current Balance
              </Text>
              <Text
                style={{
                  fontSize: 28,
                  color: item.fgColor,
                  fontWeight: "700",
                }}
              >
                ${item.balance.toLocaleString()}
              </Text>
            </Animated.View>
          </Animated.View>
        )}
        snapToInterval={dimentions.width}
        decelerationRate="fast"
        snapToAlignment="center"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
