import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import tw from '../../tailwind';

const ChunkedLoader = ({
  data = [],
  hasMore = false,
  isLoading = false,
  onLoadMore,
  renderItem,
  ListHeaderComponent,
  ListFooterComponent,
  darkMode = false,
  emptyMessage = 'No data available',
  loadMoreText = 'See More',
  loadingText = 'Loading more...',
  numColumns = 1,
  keyExtractor,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  onRefresh,
  refreshing = false,
}) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore || isLoading) return;

    setIsLoadingMore(true);
    try {
      await onLoadMore();
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, hasMore, isLoading, onLoadMore]);

  const renderLoadMoreButton = useCallback(() => {
    if (!hasMore && data.length > 0) return null;

    if (isLoadingMore) {
      return (
        <View style={tw`py-4 items-center`}>
          <ActivityIndicator size="small" color="#EA9215" />
          <Text
            style={[
              tw`font-nokia-bold text-accent-6 mt-2`,
              darkMode ? tw`text-accent-6` : tw`text-accent-6`,
            ]}>
            {loadingText}
          </Text>
        </View>
      );
    }

    if (hasMore) {
      return (
        <View style={tw`py-4 items-center`}>
          <TouchableOpacity
            style={tw`bg-accent-6 px-6 py-2 rounded-full border border-accent-6`}
            onPress={handleLoadMore}>
            <Text style={tw`font-nokia-bold text-primary-1`}>
              {loadMoreText}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  }, [
    hasMore,
    isLoadingMore,
    handleLoadMore,
    loadMoreText,
    loadingText,
    darkMode,
    data.length,
  ]);

  const renderEmptyComponent = useCallback(() => {
    if (isLoading) {
      return (
        <View style={tw`py-8 items-center`}>
          <ActivityIndicator size="large" color="#EA9215" />
          <Text
            style={[
              tw`font-nokia-bold text-accent-6 mt-2`,
              darkMode ? tw`text-accent-6` : tw`text-accent-6`,
            ]}>
            Loading...
          </Text>
        </View>
      );
    }

    return (
      <View style={tw`py-8 items-center`}>
        <Text
          style={[
            tw`font-nokia-bold text-lg`,
            darkMode ? tw`text-primary-1` : tw`text-secondary-6`,
          ]}>
          {emptyMessage}
        </Text>
      </View>
    );
  }, [isLoading, emptyMessage, darkMode]);

  const refreshControl = onRefresh
    ? {
        refreshing,
        onRefresh,
        colors: ['#EA9215'],
        tintColor: '#EA9215',
      }
    : undefined;

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      numColumns={numColumns}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => (
        <>
          {ListFooterComponent && <ListFooterComponent />}
          {renderLoadMoreButton()}
        </>
      )}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      refreshControl={refreshControl}
      onEndReached={null} // Disable automatic load more
      onEndReachedThreshold={0.1}
    />
  );
};

export default ChunkedLoader;
