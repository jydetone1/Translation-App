import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from '../utils/colors';

const LanguageItem = (props) => {
  const { text, selected, onPress } = props;
  return (
    <TouchableOpacity style={styles.languageContainer} onPress={onPress}>
      <View style={styles.languageItemWrapper}>
        {selected && (
          <Feather name='check' size={18} color={colors.textColor} />
        )}
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  languageItemWrapper: {
    paddingRight: 7,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },

  text: {
    flex: 1,
    letterSpacing: 0.3,
  },
});
export default LanguageItem;
