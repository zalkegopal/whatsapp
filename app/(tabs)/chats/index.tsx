import { View, ScrollView, FlatList } from 'react-native';
import ChatRow from '@/app/components/ChatRow';
import chats from '@/assets/data/chats.json';
import { defaultStyles } from '@/constants/Styles';

const Chats = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior='automatic'
      contentContainerStyle={{ flex: 1, paddingBottom: 40, marginTop: 40, backgroundColor: '#fff' }}
    >
      <FlatList
        data={chats}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
        )}
        renderItem={({ item }) => <ChatRow {...item} />}
      />
    </ScrollView>
  );
};

export default Chats;
