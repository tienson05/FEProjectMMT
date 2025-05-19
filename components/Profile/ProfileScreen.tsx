import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors'; // đường dẫn tới file Colors của bạn
import { useUser } from './UserContext'; // update path nếu cần

const ProfileScreen = () => {
    const { user, logout } = useUser();

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Bạn chưa đăng nhập.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name="person-circle-outline" size={80} color={Colors.primary} style={styles.icon} />
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.role}>
                    {user.role === 'admin' ? 'Quản trị viên' : 'Thu ngân'}
                </Text>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Mã nhân viên:</Text>
                    <Text style={styles.infoValue}>{user.id}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out-outline" size={20} color={Colors.white} />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    card: {
        width: '100%',
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    icon: {
        marginBottom: 12,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    role: {
        fontSize: 16,
        color: Colors.accent,
        marginTop: 4,
        marginBottom: 16,
    },
    infoBox: {
        width: '100%',
        backgroundColor: Colors.secondary,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: Colors.accent,
    },
    infoLabel: {
        fontSize: 14,
        color: Colors.dark,
    },
    infoValue: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.primary,
        marginTop: 4,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: Colors.accent,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    logoutText: {
        color: Colors.white,
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '600',
    },
    text: {
        color: Colors.dark,
        fontSize: 16,
    },
});
