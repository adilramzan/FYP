import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import useUserStore from '../store/userStore';
import { collection, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmployeesScreen = () => {
  const route = useRoute();
  const { jobId } = route.params;
  const { phoneNumber } = useUserStore();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!phoneNumber || !jobId) return;

      try {
        const employeesRef = collection(FIREBASE_DB, 'users', phoneNumber, 'jobs', jobId, 'employees');
        const querySnapshot = await getDocs(employeesRef);

        const employeesList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEmployees(employeesList);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [phoneNumber, jobId]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text style={styles.loadingText}>Loading employees...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Applicants for this Job</Text>

      {employees.length === 0 ? (
        <Text style={styles.noEmployeesText}>No applicants found.</Text>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.employeeCard}>
              
              <View style={styles.infoContainer}>
                <Text style={styles.employeeName}>{item.name || 'Unknown'}</Text>
                <View style={styles.row}>
                  <Icon name="calendar" size={20} color="#555" />
                  <Text style={styles.employeeInfo}> {item.age || 'N/A'} years</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="human-male-female" size={20} color="#555" />
                  <Text style={styles.employeeInfo}> {item.gender || 'N/A'}</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="briefcase" size={20} color="#555" />
                  <Text style={styles.employeeInfo}> {item.experience || 'N/A'} years experience</Text>
                </View>
                <View style={styles.row}>
                  <Icon name="map-marker" size={20} color="#555" />
                  <Text style={styles.employeeInfo}> {item.city || 'N/A'}</Text>
                </View>
              </View>
            </View>
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
    backgroundColor: '#F5F7FA',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#4A90E2',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 20,
    textAlign: 'center',
  },
  noEmployeesText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#666',
    marginTop: 50,
  },
  employeeCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  employeeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  employeeInfo: {
    fontSize: 16,
    color: '#555',
    marginLeft: 8,
  },
});

export default EmployeesScreen;
