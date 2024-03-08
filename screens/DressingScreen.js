import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
// import React, { useState, useEffect } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import HeaderCompo from '../components/headerCompo';
import { AntDesign } from '@expo/vector-icons';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';

export default function DressingScreen({ navigation }) {
  //   const [tops, setTops] = useState([]);

  //   useEffect(() => {
  //     const fetchData = () => {
  //       fetch('MA_ROUTE')
  //         .then((response) => response.json())
  //         .then((data) => setTops(data))
  //         .catch((error) => console.error(error));
  //     };

  //     fetchData();
  //   }, []);

  //   return (
  //     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
  //       {tops.map((top, i) => (
  //         <View key={i} style={styles.selectSubContainer}>
  //           {top.image && <Image source={{ uri: top.image }} style={styles.imageDressing} />}
  //           <Text>{top.name}</Text>
  //         </View>
  //       ))}
  //     </ScrollView>
  //   );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <HeaderCompo navigation={navigation} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          {/* en tete */}

          {/* filter */}
          <View style={styles.filterContainer}>
            <Text>Filter</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SearchScreen')}
            >
              <FontAwesome6 name='magnifying-glass' size={30} color='#0E0E66' />
            </TouchableOpacity>
          </View>

          {/* vetement haut */}
          <View style={styles.topContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image
                source={require('../assets/dressing/top-01.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/top-02.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/top-03.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/top-04.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/top-05.png')}
                style={styles.imageDressing}
              />
            </ScrollView>
          </View>

          {/* vetement bas */}
          <View style={styles.bottomContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Image
                source={require('../assets/dressing/bottom-01.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/bottom-02.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/bottom-03.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/bottom-04.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/bottom-05.png')}
                style={styles.imageDressing}
              />
            </ScrollView>
          </View>

          {/* section sélection */}
          <View style={styles.selectContainer}>
            <Text>Votre sélection</Text>

            <View style={styles.selectSubContainer}>
              <Image
                source={require('../assets/dressing/top-01.png')}
                style={styles.imageDressing}
              />
              <Image
                source={require('../assets/dressing/bottom-01.png')}
                style={styles.imageDressing}
              />
            </View>
          </View>

          {/* les boutons en bas de screen */}
          <View style={styles.buttonContainer}>
            {/* button 1 */}
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => console.log('Pressed => Sélectionner')}
            >
              <Text style={styles.buttonText}>Sélectionner</Text>
            </TouchableOpacity>

            {/* button 2 */}
            <TouchableOpacity
              onPress={() => navigation.navigate('AddArticleScreen')}
            >
              <AntDesign name='pluscircle' size={50} color='#0E0E66' />
            </TouchableOpacity>

            {/* button 3 */}
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Générer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 100,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: '5%', // Marge horizontale en pourcentage de la largeur de l'écran
    paddingVertical: '10%', // Marge verticale en pourcentage de la hauteur de l'écran
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    rowGap: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDressing: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  selectContainer: {
    borderWidth: 1,
    borderRadius: 8,
    height: 'auto',
    padding: 20,
    alignItems: 'center',
    gap: 10,
  },
  selectSubContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonLeft: {
    backgroundColor: '#FCA311',
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRight: {
    backgroundColor: '#FF4B8C',
    width: 130,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
