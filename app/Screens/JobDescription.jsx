
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import AllJobsScreen from './AllJobsScreen';
import AllJobsScreenWithoutCategory from './AllJobsScreenWithoutCategory';
import AllUsersList from './AllUsersList';
import EmployeeList from './EmployeeList';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to the Job Description Page!</Text>
      <AllJobsScreenWithoutCategory/>
      {/* <AllUsersList/>
      <EmployeeList/> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomePage;
