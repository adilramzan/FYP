import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/userStore';

const jobImages = {
  Driver: require('../../assets/images/driver.png'),
  Plumber: require('../../assets/images/plumber.png'),
  Gardener: require('../../assets/images/gardener.png'),
  Electrician: require('../../assets/images/electrician.png'),
  Mechanic: require('../../assets/images/mechanic.png'),
  Default: require('../../assets/images/worker.png'),
};

const FavouriteJobsScreen = () => {
  const { phoneNumber } = useUserStore();
  const navigation = useNavigation();
  const [favouriteJobs, setFavouriteJobs] = useState([]);

  useEffect(() => {
    const fetchFavouriteJobs = async () => {
      if (!phoneNumber) return;

      try {
        const favouritesRef = collection(FIREBASE_DB, 'users', phoneNumber, 'favourites');
        const querySnapshot = await getDocs(favouritesRef);

        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavouriteJobs(jobsData);
      } catch (error) {
        console.error("Error fetching favourite jobs:", error);
      }
    };

    fetchFavouriteJobs();
  }, [phoneNumber]);

  const removeFavourite = async (jobId) => {
    try {
      if (!phoneNumber) return;

      const favouriteRef = doc(FIREBASE_DB, 'users', phoneNumber, 'favourites', jobId);
      await deleteDoc(favouriteRef);

      setFavouriteJobs((prevState) => prevState.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error removing favourite job:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favourite Jobs</Text>
      <ScrollView style={styles.jobsContainer} showsVerticalScrollIndicator={false}>
        {favouriteJobs.length === 0 ? (
          <Text style={styles.noJobsText}>No favourite jobs yet!</Text>
        ) : (
          favouriteJobs.map((job, index) => (
            <View key={index} style={styles.jobCard}>
              <Image source={jobImages[job.jobType] || jobImages.Default} style={styles.jobImage} />
              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{job.jobTitle}</Text>
                <Text style={styles.jobType}><Icon name="briefcase" type="font-awesome" size={16} /> {job.jobType}</Text>
                <Text style={styles.jobLocation}><Icon name="map-marker" type="font-awesome" size={16} /> {job.location}</Text>
                <Text style={styles.jobEmployer}><Icon name="user" type="font-awesome" size={16} /> {job.employerName || "N/A"}</Text>
                <Text style={styles.jobPay}><Icon name="money" type="font-awesome" size={16} color="#4CAF50" /> ${job.expectedPay}</Text>
              </View>

              {/* Buttons */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('JobDescriptionScreen', { job })}
                >
                  <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.removeButton} onPress={() => removeFavourite(job.id)}>
                  <Icon name="heart" type="font-awesome" color="red" size={22} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  jobsContainer: {
    flex: 1,
  },
  jobCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  jobType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  jobEmployer: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  jobPay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 5,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  removeButton: {
    padding: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noJobsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 50,
  },
});

export default FavouriteJobsScreen;
