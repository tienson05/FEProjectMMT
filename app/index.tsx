import React, { useState } from 'react';
import { StyleSheet } from 'react-native';


import AuthScreen from '@/components/Auth/AuthScreen';
import MyTabs from '@/components/common/Header';

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    isLoggedIn ? <MyTabs /> : <AuthScreen onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
