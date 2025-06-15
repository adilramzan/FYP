
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const jobImages = {
  Driver: require('../../assets/images/driver.png'),
  Plumber: require('../../assets/images/plumber.png'),
  Gardener: require('../../assets/images/gardener.png'),
  Electrician: require('../../assets/images/electrician.png'),
  Mechanic: require('../../assets/images/mechanic.png'),
  Default: require('../../assets/images/worker.png'),
};

const AllJobsScreen = ({ selectedCategory = 'Driver' }) => {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(FIREBASE_DB, 'jobs'));

        const jobsData = [];
        querySnapshot.forEach((doc) => {
          const job = { id: doc.id, ...doc.data() };

          // Filter jobs based on selected category
          if (job.jobType === selectedCategory) {
            jobsData.push(job);
          }
        });

        setJobs(jobsData);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAllJobs();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{selectedCategory} Jobs</Text>

      {jobs.length === 0 ? (
        <Text style={styles.noJobsText}>No jobs available in this category.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.jobCard}
              onPress={() => navigation.navigate('JobDescriptionScreen', { job: item })}
            >
              <Image source={jobImages[item.jobType] || jobImages.Default} style={styles.jobImage} />

              <View style={styles.jobDetails}>
                <Text style={styles.jobTitle}>{item.jobTitle}</Text>

                <View style={styles.row}>
                  <Ionicons name="briefcase-outline" size={18} color="#4CAF50" />
                  <Text style={styles.text}> {item.jobType}</Text>
                </View>

                <View style={styles.row}>
                  <Ionicons name="location-outline" size={18} color="#FF5733" />
                  <Text style={styles.text}> {item.location}</Text>
                </View>

                <View style={styles.row}>
                  <Ionicons name="cash-outline" size={18} color="#FFC107" />
                  <Text style={styles.text}> ${item.expectedPay}</Text>
                </View>

                <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('JobDescriptionScreen', { job: item })}>
                  <Text style={styles.applyButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  noJobsText: {
    fontSize: 18,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  jobCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
  applyButton: {
    marginTop: 8,
    backgroundColor: '#FF5733',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AllJobsScreen;
