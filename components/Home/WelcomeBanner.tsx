    import React from 'react';
    import { StyleSheet, Text, View } from 'react-native';

    const WelcomeBanner = () => {
    return (
        <View style={styles.banner}>
        <Text style={styles.title}>Chào mừng đến với Quán cà phê ABC</Text>
        <Text style={styles.subtitle}>Nơi Bạn bè hội tụ</Text>
        </View>
    );
    };

    const styles = StyleSheet.create({
    banner: {
        padding: 20,
        backgroundColor: '#f9c2ff',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        marginTop: 5,
    },
    });

    export default WelcomeBanner;
