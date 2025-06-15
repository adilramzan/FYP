import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../config/firebaseConfig';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        // Create query to get only employees
        const usersQuery = query(
          collection(FIREBASE_DB, 'users'),
          where('userType', '==', 'employee')
        );

        const querySnapshot = await getDocs(usersQuery);
        
        const employeeData = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          employeeData.push({
            id: doc.id,
            phoneNumber: doc.id, // Using document ID as phone number
            ...userData
          });
        });
        
        setEmployees(employeeData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>All Employees ({employees.length})</Text>
      
      {employees.length === 0 ? (
        <Text style={styles.emptyText}>No employees found</Text>
      ) : (
        <FlatList
          data={employees}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.userCard}>
              <Text style={styles.phoneNumber}>📱 {item.phoneNumber}</Text>
              <Text style={styles.infoText}>📍 {item.location || 'No location specified'}</Text>
              <Text style={styles.infoText}>⭐ {item.workExperience || '0'} years experience</Text>
              {item.skills && (
                <Text style={styles.skillsText}>
                  🛠️ Skills: {item.skills.join(', ')}
                </Text>
              )}
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  userCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  skillsText: {
    fontSize: 14,
    color: '#2196F3',
    marginTop: 5,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default EmployeeList;