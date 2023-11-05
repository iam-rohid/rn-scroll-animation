import { setStatusBarStyle } from "expo-status-bar";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import FeatherIcons from "@expo/vector-icons/Feather";
import { allExpenses, allCards } from "./data";

const CARD_HEIGHT = 120;

const HomeScreen = () => {
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

  const cardStyle = useAnimatedStyle(() => {
    const borderRadius = interpolate(
      scrollY.value,
      [60, 80],
      [24, 0],
      Extrapolate.CLAMP
    );
    return {
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
      height: interpolate(
        scrollY.value,
        [0, 80],
        [CARD_HEIGHT, CARD_HEIGHT + insets.top],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <>
      <Animated.FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: insets.bottom,
        }}
        scrollEventThrottle={8}
        onScroll={scrollHandler}
        data={allExpenses}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, marginTop: 2, opacity: 0.5 }}>
                {item.type}
              </Text>
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
                <Text style={{ opacity: 0.7, fontSize: 14 }}>Filter By</Text>
                <FeatherIcons
                  name="chevron-down"
                  size={18}
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
        data={allCards}
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
                  borderRadius: 24,
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
                  fontSize: 16,
                  marginBottom: 4,
                  color: item.fgColor,
                }}
              >
                Current Balance
              </Text>
              <Text
                style={{
                  fontSize: 32,
                  color: item.fgColor,
                  fontWeight: "700",
                }}
              >
                ${item.balance.toLocaleString()}
              </Text>
            </Animated.View>
          </Animated.View>
        )}
        pagingEnabled
        scrollEventThrottle={8}
      />
    </>
  );
};

export default HomeScreen;
