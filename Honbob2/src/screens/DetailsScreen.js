import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

function DetailsScreen({ navigation }) {
  return (
    
        <View style={styles.container}>
            <Text>Details Screen</Text>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default DetailsScreen;