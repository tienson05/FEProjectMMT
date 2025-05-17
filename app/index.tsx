// app/index.tsx
import MyTabs from '@/components/common/Header';
import { StyleSheet, View } from 'react-native';

export default function HomePage() {
    return (
        <View style={styles.container}>
            <MyTabs />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
