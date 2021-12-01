import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import he from 'he';
import Button from '../components/button';

const API_URL =
  'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';
const TOTAL_QUESTIONS = 10;

export default function Quiz({ navigation }) {
  const [index, setIndex] = useState(-1);
  const [data, setData] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [errorText, setErrorText] = useState('');

  const getQuestions = async () => {
    const response = await fetch(API_URL).catch((error) => {
      setErrorText(error);
    });

    const { results } = await response.json();
    setData(results.map((item, idx) => ({ ...item, id: idx })));
    setIndex(0);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const getNumCorrectAnswers = () => {
    let count = 0;
    for (let i = 0; i < 10; i++) {
      if (data[i].correct_answer === answers[i]) {
        count++;
      }
    }
    return count;
  };
  if (index === -1) {
    // Loading Page
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.category}>
          {errorText === '' ? 'Loading...' : errorText}
        </Text>
      </SafeAreaView>
    );
  } else if (index >= 10) {
    // Result Page
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.scoreText}>You scored</Text>
        <Text style={styles.scoreText}>
          {getNumCorrectAnswers()} / {TOTAL_QUESTIONS}
        </Text>
        {data.map((item, index) => {
          if (index >= 10) return null;

          return (
            <View style={styles.listItem} key={index}>
              <Text style={styles.listItemText}>
                {answers[index] === item.correct_answer ? '+' : '-'}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {he.decode(item.question)}
              </Text>
            </View>
          );
        })}
        <View style={styles.buttonCenter}>
          <Button
            title='PLAY AGAIN?'
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </ScrollView>
    );
  } else {
    // Quiz Page
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.category}>{data[index].category}</Text>
        <Text style={styles.question}>{he.decode(data[index].question)}</Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.navigation}>
            {index + 1} of {TOTAL_QUESTIONS}
          </Text>
          <View style={styles.buttons}>
            <Button
              title='NO'
              onPress={() => {
                setAnswers([...answers, 'False']);
                setIndex(index + 1);
              }}
            />
            <Button
              title='YES'
              onPress={() => {
                setAnswers([...answers, 'True']);
                setIndex(index + 1);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  category: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    paddingVertical: '10%'
  },
  question: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: '10%',
    lineHeight: 36,
    borderRadius: 5,
    borderWidth: 2,
    marginHorizontal: 10,
    paddingVertical: '10%'
  },
  navigation: {
    marginLeft: 'auto',
    marginRight: 'auto',
    flexGrow: 1
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    marginBottom: '10%',
    maxHeight: 50
  },
  buttonCenter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '10%'
  },
  scoreText: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center'
  },
  listItem: {
    marginBottom: 10,
    paddingHorizontal: 5
  },
  listItemText: {
    fontSize: 20,
    lineHeight: 30
  }
});
