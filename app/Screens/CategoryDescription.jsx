import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AllJobsScreen from './AllJobsScreen';
import { useRoute } from '@react-navigation/native';

const HomePage = () => {
  const route = useRoute();
  const selectedCategory = route.params?.selectedCategory || 'Driver';

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🚀 Welcome to the Job Portal!</Text>
        <Text style={styles.subHeader}>Explore and apply for jobs that match your skills.</Text>
      </View>

      {/* Job Listings */}
      <AllJobsScreen selectedCategory={selectedCategory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  headerContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeader: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
});

export default HomePage;
