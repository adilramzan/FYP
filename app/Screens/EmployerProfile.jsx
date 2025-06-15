import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function UserDetailsScreen({ navigation }) {
  const { t } = useTranslation();
  
  // const user = {
  //   image: require('../../assets/images/person.webp'), // Replace with actual user's profile picture
  //   name: 'John Doe',
  //   phoneNumber: '+1 234-567-8901',
  //   age: '25 Years',
  //   sex: 'Male',
  //   profession: 'Software Engineer',
  //   experience: '5 Years',
  //   about:
  //     'John is a skilled developer with expertise in mobile and web application development. He enjoys creating seamless user experiences.',
  // };

  const user = {
    image: require('../../assets/images/person.webp'),
    name: t('name'),
    phoneNumber: t('phoneNumber'),
    age: t('age'),
    sex: t('sex'),
    profession: t('profession'),
    experience: t('experience'),
    about: t('aboutText'),
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        <Image source={user.image} style={styles.userImage} />
      </View>

      {/* User Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userPhone}>{user.phoneNumber}</Text>

        {/* Attributes Section */}
        <View style={styles.attributes}>
          <View style={styles.attributeCard}>
            {/* <Text style={styles.attributeTitle}>Age</Text> */}
            <Text style={styles.attributeTitle}>{t('age')}</Text>
            <Text style={styles.attributeValue}>{user.age}</Text>
          </View>
          <View style={styles.attributeCard}>
            {/* <Text style={styles.attributeTitle}>Sex</Text> */}
            <Text style={styles.attributeTitle}>{t('sex')}</Text>
            <Text style={styles.attributeValue}>{user.sex}</Text>
          </View>
          <View style={styles.attributeCard}>
            {/* <Text style={styles.attributeTitle}>Profession</Text> */}
            <Text style={styles.attributeTitle}>{t('profession')}</Text>
            <Text style={styles.attributeValue}>{user.profession}</Text>
          </View>
          <View style={styles.attributeCard}>
            {/* <Text style={styles.attributeTitle}>Experience</Text> */}
            <Text style={styles.attributeTitle}>{t('experience')}</Text>
            <Text style={styles.attributeValue}>{user.experience}</Text>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutContainer}>
          {/* <Text style={styles.sectionTitle}>About {user.name}</Text> */}
          <Text style={styles.sectionTitle}>{t('about', { name: user.name })}</Text>
          <Text style={styles.aboutText}>{user.about}</Text>
        </View>
      </View>

      {/*  Button */}
      <TouchableOpacity 
          style={styles.hireButtonContainer}  // Changed from hireButton to hireButtonContainer
          onPress={() => navigation.navigate('EmployerHome')}  // This is correct for EmployerHome
      >
        {/* <Text style={styles.homeButton}>Home Page</Text> */}
        <Text style={styles.hireButtonText}>{t('homePage')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8FAFD', // Light Background for Modern Look
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: -40, // Overlay Effect
  },
  userImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#4CAF50', // Matches Theme
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  userPhone: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginVertical: 8,
  },
  attributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  attributeCard: {
    width: '48%', // Two in a row
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  attributeTitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  attributeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32', // Green for readability
    textAlign: 'center',
  },
  aboutContainer: {
    backgroundColor: '#E8F5E9', // Soft Green Background
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  hireButtonContainer: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  hireButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
