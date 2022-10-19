import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import colors from '../../utils/colors';
import languages from '../../utils/languages';
import { translate } from '../../utils/translate';
import * as Cliboard from 'expo-clipboard';

function HomeScreen(props) {
  const params = props.route.params || {};
  const [enteredText, setEnteredText] = useState('');
  const [textResult, setTextResult] = useState('');
  const [languageTo, setLanguageTo] = useState('es');
  const [languageFrom, setLanguageFrom] = useState('en');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (params.languageTo) {
      setLanguageTo(params.languageTo);
    }
    if (params.languageFrom) {
      setLanguageFrom(params.languageFrom);
    }
  }, [params]);

  const onSubmitLanguage = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await translate(enteredText, languageFrom, languageTo);
      if (!result) {
        setTextResult('');
        return;
      }
      const textValue = result.translated_text[result.to];
      setTextResult(textValue);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [enteredText, languageTo, languageFrom]);

  const copyToClipboard = useCallback(async () => {
    await Cliboard.setStringAsync(textResult);
  }, [textResult]);

  return (
    <View style={styles.container}>
      <View style={styles.languageWrapper}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() =>
            props.navigation.navigate('Language', {
              title: 'Translate from',
              selected: languageFrom,
              mode: 'from',
            })
          }
        >
          <Text style={styles.languageText}>{languages[languageFrom]}</Text>
        </TouchableOpacity>

        <View style={styles.arrowRight}>
          <AntDesign name='arrowright' size={24} color={colors.lightGrey} />
        </View>

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() =>
            props.navigation.navigate('Language', {
              title: 'Translate to',
              selected: languageTo,
              mode: 'to',
            })
          }
        >
          <Text style={styles.languageText}> {languages[languageTo]}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          multiline
          placeholder='Type here to translate'
          style={styles.inputValue}
          onChangeText={(text) => setEnteredText(text)}
        />

        <TouchableOpacity
          disabled={enteredText === ''}
          style={styles.transalateIcon}
          onPress={isLoading ? undefined : onSubmitLanguage}
        >
          {isLoading ? (
            <ActivityIndicator size={'small'} color={colors.primary} />
          ) : (
            <View>
              <Ionicons
                name='arrow-forward-circle'
                size={24}
                color={
                  enteredText !== '' ? colors.primary : colors.primaryDisabled
                }
              />
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.outputWrapper}>
        <Text style={styles.outputValue}>{textResult}</Text>
        <TouchableOpacity
          disabled={textResult === ''}
          style={styles.transalateIcon}
          onPress={copyToClipboard}
        >
          <View>
            <MaterialCommunityIcons
              name='content-copy'
              size={24}
              color={
                textResult !== '' ? colors.textColor : colors.textColorDisabled
              }
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  languageWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },

  languageButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },

  arrowRight: {
    width: 50,
  },

  languageText: {
    color: colors.primary,
    letterSpacing: 0.3,
  },

  inputWrapper: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },

  inputValue: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    height: 90,
    letterSpacing: 0.3,
    color: colors.textColor,
  },

  transalateIcon: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  outputWrapper: {
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 90,
    paddingVertical: 15,
  },

  outputValue: {
    letterSpacing: 0.3,
    color: colors.primary,
    flex: 1,
    marginHorizontal: 20,
  },

  historyWrapper: {
    backgroundColor: colors.greyBackground,
    flex: 1,
    padding: 10,
  },
});

export default HomeScreen;
