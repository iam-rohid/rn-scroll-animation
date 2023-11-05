import { setStatusBarStyle } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  SafeAreaView,
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
import { allExpenses, allCards, Expense } from "./data";

const CARD_HEIGHT = 120;
const TITLE_HEIGHT = 80;

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
        style={styles.container}
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        scrollEventThrottle={8}
        onScroll={scrollHandler}
        data={allExpenses}
        keyExtractor={(item) => `expense-${item.id}`}
        renderItem={({ item }) => <ExpanseItem expense={item} />}
        ListHeaderComponent={() => (
          <SafeAreaView edges={["top"]}>
            <View style={styles.listHeaderTitleContainer}>
              <Text style={styles.listHeaderTitle}>Hello Rohid</Text>
            </View>
            <View style={{ height: CARD_HEIGHT }} />
            <View style={styles.filterContainer}>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterButtonLabel}>Filter By</Text>
                <FeatherIcons
                  name="chevron-down"
                  size={18}
                  style={styles.filterButtonIcon}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
      />
      <Animated.FlatList
        style={[styles.cardsList, cardScrollListStyle]}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={8}
        data={allCards}
        keyExtractor={(item) => `card-${item.id}`}
        renderItem={({ item }) => (
          <Animated.View
            style={[
              styles.cardWrapper,
              { width: dimentions.width, height: CARD_HEIGHT + insets.top },
              cardWrapperStyle,
            ]}
          >
            <Animated.View
              style={[styles.card, { backgroundColor: item.color }, cardStyle]}
            >
              <View
                style={[styles.cardCircle, { backgroundColor: item.fgColor }]}
              />
              <Text style={[styles.cardTitle, { color: item.fgColor }]}>
                Current Balance
              </Text>
              <Text style={[styles.cardPriceText, { color: item.fgColor }]}>
                ${item.balance.toLocaleString()}
              </Text>
            </Animated.View>
          </Animated.View>
        )}
      />
    </>
  );
};

export default HomeScreen;

function ExpanseItem({ expense }: { expense: Expense }) {
  return (
    <View style={styles.listItem}>
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{expense.title}</Text>
        <Text style={styles.listItemSubtitle}>{expense.type}</Text>
      </View>
      <Text style={styles.listItemValue}>{expense.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  listHeaderTitleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    height: TITLE_HEIGHT,
    justifyContent: "flex-end",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  filterButton: { flexDirection: "row", alignItems: "center", gap: 2 },
  filterButtonLabel: { opacity: 0.7, fontSize: 14 },
  filterButtonIcon: { opacity: 0.7 },
  listHeaderTitle: { fontSize: 36, fontWeight: "800" },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: { fontSize: 16, fontWeight: "500" },
  listItemSubtitle: { fontSize: 14, marginTop: 2, opacity: 0.5 },
  listItemValue: { fontSize: 16, fontWeight: "600", textAlign: "right" },
  cardsList: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  cardWrapper: {
    justifyContent: "flex-end",
  },
  card: {
    justifyContent: "flex-end",
    padding: 16,
    position: "relative",
    overflow: "hidden",
    borderRadius: 24,
  },
  cardTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  cardCircle: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 300,
    backgroundColor: "#ffffff",
    opacity: 0.1,
    top: -60,
    left: -100,
  },
  cardPriceText: {
    fontSize: 32,
    fontWeight: "700",
  },
});
