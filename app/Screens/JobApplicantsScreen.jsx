import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';

const JobApplicantsScreen = () => {
  const route = useRoute();
  const { jobId } = route.params; // Get the job ID from navigation params
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const employeesRef = collection(FIREBASE_DB, 'jobs', jobId, 'employees');
        const querySnapshot = await getDocs(employeesRef);

        const applicantsData = [];
        querySnapshot.forEach((doc) => {
          applicantsData.push({ id: doc.id, ...doc.data() });
        });

        setApplicants(applicantsData);
      } catch (error) {
        console.error("Error fetching applicants:", error);
        Alert.alert("Error", "Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [jobId]);

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (applicants.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noApplicantsText}>No applicants for this job yet.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Job Applicants</Text>
      
      {applicants.map((applicant, index) => (
        <View key={index} style={styles.applicantCard}>
          <Image source={require('../../assets/images/person.webp')} style={styles.profileImage} />
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{applicant.name || "Unknown"}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Phone:</Text> {applicant.phoneNumber}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Age:</Text> {applicant.age || "N/A"}</Text>
            <Text style={styles.text}><Text style={styles.bold}>City:</Text> {applicant.city || "N/A"}</Text>
            <Text style={styles.text}><Text style={styles.bold}>Experience:</Text> {applicant.experience || "N/A"} years</Text>
            <Text style={styles.text}><Text style={styles.bold}>Applied On:</Text> {new Date(applicant.appliedAt).toLocaleDateString()}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
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
  },
  noApplicantsText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginTop: 50,
  },
  applicantCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    alignItems: 'center',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#555',
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default JobApplicantsScreen;
