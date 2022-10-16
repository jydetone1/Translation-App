import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import colors from '../../utils/colors';
function HomeScreen(props) {
  const [text, setText] = useState('');
  const [textResult, setTextResult] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.languageWrapper}>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() =>
            props.navigation.navigate('Language', {
              title: 'Translate from',
            })
          }
        >
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>

        <View style={styles.arrowRight}>
          <AntDesign name='arrowright' size={24} color={colors.lightGrey} />
        </View>

        <TouchableOpacity
          style={styles.languageButton}
          onPress={() =>
            props.navigation.navigate('Language', {
              title: 'Translate to',
            })
          }
        >
          <Text style={styles.languageText}>Spanish</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputWrapper}>
        <TextInput
          multiline
          placeholder='Type here to translate'
          style={styles.inputValue}
          onChangeText={(text) => setText(text)}
        />

        <TouchableOpacity
          disabled={text === ''}
          style={styles.transalateIcon}
          onPress={() => console.log('push')}
        >
          <View>
            <Ionicons
              name='arrow-forward-circle'
              size={24}
              color={text !== '' ? colors.primary : colors.primaryDisabled}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.outputWrapper}>
        <Text style={styles.outputValue}>{textResult}</Text>

        <TouchableOpacity
          disabled={textResult === ''}
          style={styles.transalateIcon}
          onPress={() => console.log('push')}
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

      <View style={styles.historyWrapper}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>Translate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>Swap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>Saved</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => console.log('push')}
        >
          <Text style={styles.buttonText}>Settings</Text>
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
