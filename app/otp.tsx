import Colors from '@/constants/Colors';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IND_PHONE = [
  `+`,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const OTP_Page = () => {
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const openLink = () => {
    Linking.openURL('https://galaxies.dev');
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      await signUp!.create({ phoneNumber });
      // send otp
      signUp!.preparePhoneNumberVerification();
      console.log('otp sent')
      router.replace(`/verify/${phoneNumber}`);
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_exists') {
          // User signed up before
          console.log('User signed up before');
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert(err.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async() => {
    console.log('try signin')
    setLoading(true)
    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId
    });

    router.replace(`/verify/${phoneNumber}?signin=true`)
    setLoading(false)
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading && (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size={'large'} color={Colors.primary} />
            <Text style={{ color: Colors.gray }}>sending otp</Text>
          </View>
        )}
        <Text style={styles.description}>
          Whatsapp will need to verify your phone. Carrier charges may apply.
        </Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Text style={styles.listItemText}>India</Text>
            <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />
          <MaskInput
            value={phoneNumber}
            keyboardType='numeric'
            autoFocus
            placeholder='+91 your phone number'
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={IND_PHONE}
            style={styles.input}
          />
        </View>

        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[
            styles.button,
            phoneNumber != '' ? styles.enabled : null,
            { marginBottom: bottom },
          ]}
          onPress={sendOtp}
        >
          <Text
            style={[
              styles.buttonText,
              phoneNumber != '' ? styles.enabled : null,
            ]}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 20,
    backgroundColor: Colors.background,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  list: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff',
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  loading: {
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});
export default OTP_Page;
