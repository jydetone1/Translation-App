import { Alert, StyleSheet, View } from 'react-native';
import SettingsItems from '../../components/SettingsItems';
import colors from '../../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { clearHistory } from '../../store/historySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setSavedItems } from '../../store/savedItemSlice';

function SettingsScreen() {
  const dispatch = useDispatch();

  const deleteHistory = useCallback(async () => {
    try {
      await AsyncStorage.setItem('history', JSON.stringify([]));
      dispatch(clearHistory({ items: [] }));
      Alert.alert('Success', 'History cleared');
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);

  const deleteSavedItem = useCallback(async () => {
    try {
      await AsyncStorage.setItem('savedItems', JSON.stringify([]));
      dispatch(setSavedItems({ items: [] }));
      Alert.alert('Success', 'SavedItems cleared');
    } catch (e) {
      console.log(e);
    }
  }, [dispatch]);
  return (
    <View style={styles.container}>
      <SettingsItems
        title='Clear history'
        iconFamily={MaterialIcons}
        subTitle='Clear all history'
        icon='delete'
        onPress={deleteHistory}
      />

      <SettingsItems
        title='Clear saved items'
        iconFamily={MaterialIcons}
        subTitle='Clear  all saved items'
        icon='delete'
        onPress={deleteSavedItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 10,
  },
});

export default SettingsScreen;
