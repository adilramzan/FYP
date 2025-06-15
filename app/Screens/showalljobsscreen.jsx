// import React from 'react';
// import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const jobImages = {
//   Driver: require('../../assets/images/driver.png'),
//   Plumber: require('../../assets/images/plumber.png'),
//   Gardener: require('../../assets/images/gardener.png'),
//   Electrician: require('../../assets/images/electrician.png'),
//   Mechanic: require('../../assets/images/mechanic.png'),
//   Default: require('../../assets/images/worker.png'),
// };

// const AllJobsListScreen = ({ route }) => {
//   const navigation = useNavigation();
//   const { jobs } = route.params; // Get jobs from navigation params

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>All Available Jobs</Text>

//       <FlatList
//         data={jobs}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity 
//             style={styles.jobCard} 
//             onPress={() => navigation.navigate('JobDescriptionScreen', { job: item })}
//           >
//             <Image source={jobImages[item.jobType] || jobImages.Default} style={styles.jobImage} />
//             <View style={styles.jobDetails}>
//               <Text style={styles.jobTitle}>{item.jobTitle}</Text>
//               <Text style={styles.jobLocation}>{item.location}</Text>
//               <Text style={styles.jobPay}>${item.expectedPay}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   header: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   jobCard: {
//     flexDirection: 'row',
//     backgroundColor: '#eef2f3',
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   jobImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   jobDetails: {
//     flex: 1,
//   },
//   jobTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   jobLocation: {
//     fontSize: 14,
//     color: '#666',
//   },
//   jobPay: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#ff5c5c',
//   },
// });

// export default AllJobsListScreen;


import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const jobImages = {
  Driver: require('../../assets/images/driver.png'),
  Plumber: require('../../assets/images/plumber.png'),
  Gardener: require('../../assets/images/gardener.png'),
  Electrician: require('../../assets/images/electrician.png'),
  Mechanic: require('../../assets/images/mechanic.png'),
  Default: require('../../assets/images/worker.png'),
};

const AllJobsListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { jobs } = route.params;

  const renderJobItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.jobCard} 
      onPress={() => navigation.navigate('JobDescriptionScreen', { job: item })}
      activeOpacity={0.9}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={jobImages[item.jobType] || jobImages.Default} 
          style={styles.jobImage} 
          resizeMode="contain"
        />
      </View>
      <View style={styles.jobDetails}>
        <Text style={styles.jobTitle} numberOfLines={1}>{item.jobTitle}</Text>
        <View style={styles.detailRow}>
          <Text style={styles.jobType}>{item.jobType}</Text>
          <View style={styles.separator} />
          <Text style={styles.jobLocation} numberOfLines={1}>{item.location}</Text>
        </View>
        <Text style={styles.jobPay}>${item.expectedPay}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <Text style={styles.arrowIcon}>→</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Available Jobs</Text>
        <Text style={styles.jobCount}>{jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'}</Text>
      </View>

      {jobs.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No jobs available at the moment</Text>
          <Text style={styles.emptySubtext}>Please check back later</Text>
        </View>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJobItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingVertical: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EDF2F7',
    marginBottom: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    textAlign: 'center',
  },
  jobCount: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginTop: 4,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#4A5568',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#718096',
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 24,
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  imageContainer: {
    width: 56,
    height: 56,
    backgroundColor: '#EBF4FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  jobImage: {
    width: 36,
    height: 36,
  },
  jobDetails: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 6,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobType: {
    fontSize: 14,
    color: '#5E72E4',
    fontWeight: '500',
  },
  separator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E0',
    marginHorizontal: 8,
  },
  jobLocation: {
    fontSize: 14,
    color: '#718096',
    flexShrink: 1,
  },
  jobPay: {
    fontSize: 15,
    fontWeight: '600',
    color: '#38A169',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrowIcon: {
    fontSize: 20,
    color: '#A0AEC0',
    fontWeight: 'bold',
  },
});

export default AllJobsListScreen;