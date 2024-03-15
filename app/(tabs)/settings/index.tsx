import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useAuth } from '@clerk/clerk-expo';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import BoxedIcon from '../../components/BoxedIcon';
import { Ionicons } from '@expo/vector-icons';

const Settings = () => {
  const devices = [
    {
      name: 'Broadcast Lists',
      icon: 'megaphone',
      backgroundColor: Colors.green,
    },
    {
      name: 'Starred Messages',
      icon: 'star',
      backgroundColor: Colors.yellow,
    },
    {
      name: 'Linked Devices',
      icon: 'laptop-outline',
      backgroundColor: Colors.green,
    },
  ];

  const items = [
    {
      name: 'Account',
      icon: 'key',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Privacy',
      icon: 'lock-closed',
      backgroundColor: '#33A5D1',
    },
    {
      name: 'Chats',
      icon: 'logo-whatsapp',
      backgroundColor: Colors.green,
    },
    {
      name: 'Notifications',
      icon: 'notifications',
      backgroundColor: Colors.red,
    },
    {
      name: 'Storage and Data',
      icon: 'repeat',
      backgroundColor: Colors.green,
    },
  ];

  const support = [
    {
      name: 'Help',
      icon: 'information',
      backgroundColor: Colors.primary,
    },
    {
      name: 'Tell a Friend',
      icon: 'heart',
      backgroundColor: Colors.red,
    },
  ];

  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior='automatic'>
        <View style={defaultStyles.block}>
          <FlatList
            data={devices}
            scrollEnabled={false}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item, index }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item, index }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>
        <View style={defaultStyles.block}>
          <FlatList
            data={support}
            scrollEnabled={false}
            keyExtractor={(item) => item.name}
            ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
            renderItem={({ item, index }) => (
              <View style={defaultStyles.item}>
                <BoxedIcon name={item.icon} backgroundColor={item.backgroundColor} />
                <Text style={styles.itemText}>{item.name}</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
              </View>
            )}
          />
        </View>

        <TouchableOpacity onPress={() => signOut()}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  itemText: {
    flex: 1,
    fontSize: 18,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primary,
    textAlign: 'center',
    paddingVertical: 14
  }
});

export default Settings;
