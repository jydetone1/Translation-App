import { useCallback } from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import colors from '../utils/colors';
import { Entypo } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setSavedItems } from '../store/savedItemSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TranslationResult = (props) => {
  const { itemId } = props;
  const dispatch = useDispatch();

  const item = useSelector((state) => {
    return (
      state.history.items.find((item) => item.id === itemId) ||
      state.savedItems.items.find((item) => item.id === itemId)
    );
  });

  const savedItems = useSelector((state) => state.savedItems.items);

  const isSaved = savedItems.some((i) => i.id === itemId);

  const starIcon = isSaved ? 'star' : 'star-outlined';

  const starItem = useCallback(async () => {
    let newSavedItems;
    try {
      if (isSaved) {
        newSavedItems = savedItems.filter((i) => i.id !== itemId);
      } else {
        newSavedItems = savedItems.slice();
        newSavedItems.push(item);
        // newSavedItems = [...savedItems, item];
      }
      await AsyncStorage.setItem('savedItems', JSON.stringify(newSavedItems));
      dispatch(setSavedItems({ items: newSavedItems }));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, savedItems]);

  return (
    <View style={styles.languageContainer}>
      <View style={styles.textWrapper}>
        <Text numberOfLines={4} style={styles.title}>
          {item.original_text}
        </Text>
        <Text numberOfLines={4} style={styles.subTitle}>
          {item.translated_text[item.to]}
        </Text>
      </View>

      <TouchableOpacity onPress={starItem} styles={styles.iconWrapper}>
        <Entypo name={starIcon} size={24} color={colors.subTextColour} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    borderTopWidth: 0,
  },
  textWrapper: {
    flex: 1,
    marginRight: 0,
  },

  title: {
    letterSpacing: 0.3,
    color: colors.textColor,
  },

  subTitle: {
    letterSpacing: 0.3,
    color: colors.subTextColour,
  },

  iconWrapper: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TranslationResult;
