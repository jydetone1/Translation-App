import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import colors from '../../utils/colors';
import languages from '../../utils/languages';
import LanguageItem from '../../components/LanguageItem';

const CustomedHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color || colors.primary}
    />
  );
};

function LanguageScreen({ navigation, route }) {
  const params = route.params || {};
  const { title, selected } = params;
  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomedHeaderButton}>
          <Item
            iconName='close'
            color={colors.textColor}
            onPress={() => navigation.goBack()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const onLanguageSelected = useCallback(
    (itemKey) => {
      const dataKey = params.mode === 'to' ? 'languageTo' : 'languageFrom';
      navigation.navigate('Home', { [dataKey]: itemKey });
    },
    [params, navigation]
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(languages)}
        renderItem={(itemData) => {
          const languageKey = itemData.item;
          const language = languages[languageKey];
          return (
            <LanguageItem
              onPress={() => onLanguageSelected(languageKey)}
              text={language}
              selected={languageKey === selected}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default LanguageScreen;
