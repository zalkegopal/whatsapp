import { Text, View, StyleSheet, Image } from 'react-native';
import { AlphabetList } from 'react-native-section-alphabet-list';
import contacts from '@/assets/data/contacts.json';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';

const NewChat = () => {
  const data = contacts.map((contact, index) => {
    return {
      value: `${contact.first_name} ${contact.last_name}`,
      name: `${contact.first_name} ${contact.last_name}`,
      img: contact.img,
      desc: contact.desc,
      key: `${contact.first_name} ${contact.last_name}-${index}`,
    };
  });

  return (
    <View>
      <AlphabetList
        data={data}
        indexLetterStyle={{
          color: Colors.primary,
          fontSize: 12,
        }}
        indexContainerStyle={{
          width: 24,
          backgroundColor: Colors.background,
        }}
        style={{ marginLeft: 14 }}
        renderCustomItem={(item: any) => (
            <>
          <View style={styles.listItemContainer}>
            <Image source={{ uri: item.img }} width={40} height={40} borderRadius={20} />
            <View>
              <Text style={{ fontSize: 14, color: '#000' }}>{item.value}</Text>
              <Text style={{ fontSize: 12, color: Colors.gray }}>
                {item.desc.length > 40 ? `${item.desc.substring(0, 40)}...` : item.desc}
              </Text>
            </View>
          </View>
          <View style={defaultStyles.separator} />
          </>
        )}
        renderCustomSectionHeader={(section) => (
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderLabel}>{section.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 14,
    height: 50,
    paddingTop: 4,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  sectionHeaderContainer: {
    height: 30,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  sectionHeaderLabel: {
    color: Colors.gray,
  },
});

export default NewChat;
