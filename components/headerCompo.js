import React from 'react';
import { View, StyleSheet } from 'react-native';

import UserCompo from './userCompo';
import AppTitleCompo from './appTitleCompo';

function HeaderCompo({ navigation }) {
  return (
    <View style={styles.container}>
      <AppTitleCompo navigation={navigation} />

      <UserCompo navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#0E0E66',
  },
});

export default HeaderCompo;
