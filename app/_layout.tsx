import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack, Link, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { View, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the jwt token
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
  const router = useRouter();
  const segments = useSegments();
  const { isLoaded, isSignedIn } = useAuth();

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats');
    } else if (!isSignedIn) {
      console.log('not signed in');
      router.replace('/');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen
        name='otp'
        options={{
          headerTitle: 'Enter your phone number',
          headerBackVisible: false,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='verify/[phone]'
        options={{
          headerTitle: 'Verify your phone number',
          headerBackTitle: 'Edit number',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name='(tabs)'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='(modals)/new-chat'
        options={{
          title: 'New Chat',
          presentation: 'modal',
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search name or phone number',
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <Link href={'/(tabs)/chats'} asChild>
              <TouchableOpacity
              style={{ backgroundColor: Colors.lightGray, borderRadius: 16, padding: 2 }}>
                <Ionicons name='close-outline' size={24} color={Colors.gray} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  );
};

const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;
