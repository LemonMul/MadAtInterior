import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import Colors from '@/constants/Colors';
import FlaskConfig from '@/flask.config';

const SvdRec = () => {
  const [svdData, setSvdData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const userid = 17; // 여기 userid 셋팅!

  useEffect(() => {
    console.log('Component mounted, starting to fetch SVD data...');
    loadSvdPlaces(userid);
  }, [userid]);

  const loadSvdPlaces = (userid) => {
    console.log(`Fetching SVD data for user id: ${userid}`);
    fetch(
      `http://${FlaskConfig.Private_IP_Address}:${FlaskConfig.svd}/svd?userid=${userid}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => {
        console.log('Received response from server');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Data successfully parsed as JSON', data);
        if (data.error) {
          setErrorMessage(data.error);
          setSvdData([]);
        } else {
          setSvdData(data);
          setErrorMessage('');
        }
      })
      .catch((error) => {
        console.error('Error fetching svd data:', error);
        setErrorMessage('Failed to fetch data.');
      });
  };

  const moveToFinish = () => {
    router.replace('place/placeFinish');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('@/assets/images/place/lake.png')}
          style={styles.libraryImage}
        />
      </View>
      {svdData.length > 0 ? (
        <>
          <Text style={styles.title}>다른 이용자들은</Text>
          <Text style={styles.title}>
            {svdData[0].placeName}을 방문하고 있어요!
          </Text>
          <Text style={styles.subtitle}>#{svdData[0].keyword.join(' #')}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.likeButton]}
              onPress={moveToFinish}
            >
              <Text style={styles.buttonText}>좋아요!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.dislikeButton]}>
              <Text style={styles.buttonText}>별로에요!</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
      {errorMessage !== '' && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  libraryImage: {
    width: 300,
    height: 180,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeButton: {
    backgroundColor: Colors.purple,
  },
  dislikeButton: {
    backgroundColor: Colors.gray,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginVertical: 5,
  },
  loading: {
    fontSize: 18,
    color: Colors.black,
    textAlign: 'center',
  },
});

export default SvdRec;
