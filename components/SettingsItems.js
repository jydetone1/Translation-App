import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import colors from '../utils/colors';

const SettingsItems = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {props.title}
        </Text>

        <Text numberOfLines={1} style={styles.subTitle}>
          {props.subTitle}
        </Text>
      </View>

      <View styles={styles.iconsItem}>
        <props.iconFamily name={props.icon} size={24} color={colors.primary} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: colors.lightGrey,
    borderWidth: 0.5,
    borderTopWidth: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  textContainer: {
    flex: 1,
    marginVertical: 8,
  },
  title: {
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  subTitle: {
    letterSpacing: 0.3,
    color: colors.subTextColour,
    fontSize: 13,
  },

  iconsItem: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsItems;
