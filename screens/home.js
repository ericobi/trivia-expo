import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Button from '../components/button';

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to the Trivia Challenge!</Text>
      <Text style={styles.description}>
        You will be presented with 10 True or False questions.
      </Text>
      <Text style={styles.description}>Can you score 100%?</Text>
      <View style={styles.navigation}>
        <Button
          title='BEGIN'
          onPress={() => {
            navigation.navigate('Quiz');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: '15%',
    marginBottom: '10%'
  },
  description: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: '10%',
    lineHeight: 36
  },
  navigation: {
    paddingVertical: '25%',
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto'
  }
});
