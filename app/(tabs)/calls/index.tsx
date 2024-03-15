import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import calls from '@/assets/data/calls.json';
import { FlatList } from 'react-native-gesture-handler';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

const Calls = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(calls);

  const onEdit = () => {
    let newEdit = !isEditing;
    setIsEditing(newEdit);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={onEdit}>
              <Text style={{ fontSize: 18, color: Colors.primary }}>
                {isEditing ? 'Done' : 'Edit'}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView contentInsetAdjustmentBehavior='automatic' contentContainerStyle={{ paddingBottom: 40 }} style={{ marginTop: 20 }}>
        <View style={[defaultStyles.block]}>
          <FlatList
            data={items}
            scrollEnabled={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <View style={defaultStyles.item}>
                <Image source={{ uri: item.img }} style={styles.avatar} />
                <View style={{ flex: 1, gap: 2 }}>
                  <Text style={{ fontSize: 18, color: item.missed ? Colors.red : '#000' }}>
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: 'row', gap: 4 }}>
                    <Ionicons
                      name={item.video ? 'videocam' : 'call'}
                      size={16}
                      color={Colors.gray}
                    />
                    <Text style={{ color: Colors.gray, flex: 1 }}>
                      {item.incoming ? 'Incoming' : 'Outgoing'}
                    </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                  <Text style={{color: Colors.gray}}>{format(item.date, 'dd:MM:yy')}</Text>
                  <Ionicons name='information-circle-outline' size={24} color={Colors.primary} />
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default Calls;
