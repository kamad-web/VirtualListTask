import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const ITEM_HEIGHT = 50;
const PAGE_SIZE = 100;

export const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({length: PAGE_SIZE}, (_, index) => ({
        id: data.length + index,
        title: `Item ${data.length + index + 1}`,
      }));
      setData([...data, ...newItems]);
      setPage(page + 1);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchMoreData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{margin: 10}} />;
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      onEndReached={fetchMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});
