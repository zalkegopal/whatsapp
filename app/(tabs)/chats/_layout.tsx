import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { View, Image, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          title: 'Chats',
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerSearchBarOptions: {
            placeholder: 'Search',
            headerIconColor: Colors.primary,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name='camera-outline' size={30} color={Colors.primary} />
              </TouchableOpacity>
              <Link href='/(modals)/new-chat' asChild>
                <TouchableOpacity>
                  <Ionicons name='add-circle' size={30} color={Colors.primary} />
                </TouchableOpacity>
              </Link>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name='[id]'
        options={{
          title: '',
          headerBackTitleVisible: false,
          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                width: 220,
                alignItems: 'center',
                gap: 10,
                paddingBottom: 4,
              }}
            >
              <Image
                source={{
                  uri: 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
                }}
                style={{ width: 40, height: 40, borderRadius: 50 }}
              />
              <Text style={{ fontSize: 16, fontWeight: '500' }}>Simon Grimm</Text>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30 }}>
              <TouchableOpacity>
                <Ionicons name='videocam-outline' color={Colors.primary} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name='call-outline' color={Colors.primary} size={30} />
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.background,
          },
        }}
      />
    </Stack>
  );
};

export default Layout;
