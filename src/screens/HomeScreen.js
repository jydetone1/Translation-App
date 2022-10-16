import { StyleSheet, Text, View } from 'react-native';

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text> eeworking on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
