import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

export class CacheManager {
  constructor() {
    this.CACHE_PREFIX = 'app_cache_';
    this.CHUNK_SIZE = 5; // Default chunk size for pagination
    this.MAX_CACHE_SIZE = 100 * 1024 * 1024; // 100MB max cache size
  }

  // Generate cache key
  generateCacheKey(type, params = {}) {
    const key = `${this.CACHE_PREFIX}${type}_${JSON.stringify(params)}`;
    return key.replace(/[^a-zA-Z0-9_]/g, '_');
  }

  // Save data to cache with metadata
  async saveToCache(key, data, expiryMinutes = 60 * 24 * 7) {
    // Default 7 days
    try {
      const cacheEntry = {
        data,
        timestamp: Date.now(),
        expiry: Date.now() + expiryMinutes * 60 * 1000,
        version: '1.0',
      };

      await AsyncStorage.setItem(key, JSON.stringify(cacheEntry));
      console.log(`✅ Cached data for key: ${key}`);

      // Update cache metadata
      await this.updateCacheMetadata(key, JSON.stringify(cacheEntry).length);

      return true;
    } catch (error) {
      console.error(`❌ Error caching data for key ${key}:`, error);
      return false;
    }
  }

  // Get data from cache
  async getFromCache(key, checkExpiry = true) {
    try {
      const cachedData = await AsyncStorage.getItem(key);
      if (!cachedData) {
        return null;
      }

      const cacheEntry = JSON.parse(cachedData);

      // Check if expired
      if (checkExpiry && Date.now() > cacheEntry.expiry) {
        console.log(`🕒 Cache expired for key: ${key}`);
        await this.removeFromCache(key);
        return null;
      }

      console.log(`📦 Retrieved cached data for key: ${key}`);
      return cacheEntry.data;
    } catch (error) {
      console.error(`❌ Error retrieving cached data for key ${key}:`, error);
      return null;
    }
  }

  // Remove specific cache entry
  async removeFromCache(key) {
    try {
      await AsyncStorage.removeItem(key);
      await this.removeCacheMetadata(key);
      console.log(`🗑️ Removed cache for key: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Error removing cache for key ${key}:`, error);
      return false;
    }
  }

  // Check if online
  async isOnline() {
    try {
      const netInfo = await NetInfo.fetch();
      return netInfo.isConnected && netInfo.isInternetReachable;
    } catch (error) {
      console.error('Error checking network status:', error);
      return false;
    }
  }

  // Cache-first strategy with chunked loading
  async cacheFirstStrategy(fetchFunction, cacheKey, options = {}) {
    const {
      forceRefresh = false,
      expiryMinutes = 60 * 24 * 7,
      chunk = false,
      chunkSize = this.CHUNK_SIZE,
      page = 0,
    } = options;

    try {
      // Check for cached data first (unless force refresh)
      if (!forceRefresh) {
        const cachedData = await this.getFromCache(cacheKey);
        if (cachedData) {
          console.log(`📦 Using cached data for: ${cacheKey}`);

          // If chunked, return specific chunk
          if (chunk && Array.isArray(cachedData)) {
            const startIndex = page * chunkSize;
            const endIndex = startIndex + chunkSize;
            return {
              data: cachedData.slice(startIndex, endIndex),
              hasMore: endIndex < cachedData.length,
              totalCount: cachedData.length,
              currentPage: page,
              fromCache: true,
            };
          }

          return {data: cachedData, fromCache: true};
        }
      }

      // Check online status
      const online = await this.isOnline();
      if (!online) {
        // Try to return stale cached data if offline
        const staleData = await this.getFromCache(cacheKey, false);
        if (staleData) {
          console.log(`📡 Offline: Using stale cached data for: ${cacheKey}`);

          if (chunk && Array.isArray(staleData)) {
            const startIndex = page * chunkSize;
            const endIndex = startIndex + chunkSize;
            return {
              data: staleData.slice(startIndex, endIndex),
              hasMore: endIndex < staleData.length,
              totalCount: staleData.length,
              currentPage: page,
              fromCache: true,
              isStale: true,
            };
          }

          return {data: staleData, fromCache: true, isStale: true};
        }

        throw new Error('No internet connection and no cached data available');
      }

      // Fetch fresh data
      console.log(`🌐 Fetching fresh data for: ${cacheKey}`);
      const freshData = await fetchFunction();

      // Validate data structure
      if (!this.validateDataStructure(freshData)) {
        throw new Error('Invalid data structure received from network');
      }

      // Cache the fresh data
      await this.saveToCache(cacheKey, freshData, expiryMinutes);

      // Return chunked data if requested
      if (chunk && Array.isArray(freshData)) {
        const startIndex = page * chunkSize;
        const endIndex = startIndex + chunkSize;
        return {
          data: freshData.slice(startIndex, endIndex),
          hasMore: endIndex < freshData.length,
          totalCount: freshData.length,
          currentPage: page,
          fromCache: false,
        };
      }

      return {data: freshData, fromCache: false};
    } catch (error) {
      console.error(`❌ Error in cacheFirstStrategy for ${cacheKey}:`, error);

      // Final fallback to stale cache
      const fallbackData = await this.getFromCache(cacheKey, false);
      if (fallbackData) {
        console.log(`🔄 Using fallback cached data for: ${cacheKey}`);

        if (chunk && Array.isArray(fallbackData)) {
          const startIndex = page * chunkSize;
          const endIndex = startIndex + chunkSize;
          return {
            data: fallbackData.slice(startIndex, endIndex),
            hasMore: endIndex < fallbackData.length,
            totalCount: fallbackData.length,
            currentPage: page,
            fromCache: true,
            isStale: true,
            error: error.message,
          };
        }

        return {
          data: fallbackData,
          fromCache: true,
          isStale: true,
          error: error.message,
        };
      }

      throw error;
    }
  }

  // Validate data structure
  validateDataStructure(data) {
    try {
      console.log('🔍 Validating data structure:', {
        type: typeof data,
        isArray: Array.isArray(data),
        keys:
          typeof data === 'object' && data !== null ? Object.keys(data) : null,
        hasQuarterlies:
          data && typeof data === 'object' && 'quarterlies' in data,
      });

      if (data === null || data === undefined) {
        console.log('❌ Data is null or undefined');
        return false;
      }

      // Handle different valid data structures
      if (Array.isArray(data)) {
        // Array of quarterlies
        console.log('✅ Valid array data structure');
        return true;
      }

      if (typeof data === 'object') {
        // Object with quarterlies property
        if (
          data.quarterlies &&
          (Array.isArray(data.quarterlies) ||
            typeof data.quarterlies === 'object')
        ) {
          console.log('✅ Valid quarterlies object structure');
          return true;
        }

        // Single quarterly object
        if (data.id && (data.title || data.human_date || data.cover)) {
          console.log('✅ Valid single quarterly structure');
          return true;
        }

        // Lesson details structure
        if (data.lesson && data.lesson.title) {
          console.log('✅ Valid lesson details structure');
          return true;
        }

        // Quarter details structure
        if (data.quarterly && data.quarterly.title) {
          console.log('✅ Valid quarter details structure');
          return true;
        }

        // Video link structure (including error responses)
        if (data.videoUrl || data.video_url || data.error) {
          console.log('✅ Valid video link structure');
          return true;
        }

        // Content structure
        if (data.content || data.bible) {
          console.log('✅ Valid content structure');
          return true;
        }

        // Empty object is valid
        if (Object.keys(data).length === 0) {
          console.log('✅ Valid empty object');
          return true;
        }

        console.log('✅ Valid object structure (fallback)');
        return true;
      }

      console.log('❌ Invalid data structure');
      return false;
    } catch (error) {
      console.error('❌ Error validating data structure:', error);
      return false;
    }
  }

  // Network-first strategy for critical updates
  async networkFirstStrategy(fetchFunction, cacheKey, options = {}) {
    const {expiryMinutes = 60 * 24 * 7} = options;

    try {
      // Check online status
      const online = await this.isOnline();
      if (!online) {
        return await this.cacheFirstStrategy(fetchFunction, cacheKey, options);
      }

      // Try network first
      console.log(`🌐 Network-first: Fetching fresh data for: ${cacheKey}`);
      const freshData = await fetchFunction();

      if (!this.validateDataStructure(freshData)) {
        throw new Error('Invalid data structure received from network');
      }

      await this.saveToCache(cacheKey, freshData, expiryMinutes);
      return {data: freshData, fromCache: false};
    } catch (error) {
      console.error(
        `❌ Network-first failed for ${cacheKey}, falling back to cache:`,
        error,
      );
      return await this.cacheFirstStrategy(
        () => Promise.reject(error),
        cacheKey,
        {forceRefresh: false},
      );
    }
  }

  // Priority loading for current content
  async priorityLoad(priorityFetchers, backgroundFetchers = []) {
    const results = {};

    try {
      // Load priority content first
      console.log('🚀 Loading priority content...');
      const priorityPromises = priorityFetchers.map(
        async ({key, fetcher, cacheKey, options = {}}) => {
          try {
            const result = await this.cacheFirstStrategy(
              fetcher,
              cacheKey,
              options,
            );
            results[key] = result;
            return {key, success: true};
          } catch (error) {
            console.error(`❌ Priority load failed for ${key}:`, error);
            results[key] = {error: error.message, fromCache: false};
            return {key, success: false, error};
          }
        },
      );

      await Promise.all(priorityPromises);
      console.log('✅ Priority content loaded');

      // Load background content asynchronously
      if (backgroundFetchers.length > 0) {
        console.log('📱 Loading background content...');
        backgroundFetchers.forEach(
          async ({key, fetcher, cacheKey, options = {}}) => {
            try {
              const result = await this.cacheFirstStrategy(
                fetcher,
                cacheKey,
                options,
              );
              results[key] = result;
            } catch (error) {
              console.error(`❌ Background load failed for ${key}:`, error);
              results[key] = {error: error.message, fromCache: false};
            }
          },
        );
      }

      return results;
    } catch (error) {
      console.error('❌ Priority load failed:', error);
      throw error;
    }
  }

  // Cache metadata management
  async updateCacheMetadata(key, size) {
    try {
      const metadataKey = `${this.CACHE_PREFIX}metadata`;
      const metadata = await AsyncStorage.getItem(metadataKey);
      const cacheMetadata = metadata ? JSON.parse(metadata) : {};

      cacheMetadata[key] = {
        size,
        lastAccessed: Date.now(),
      };

      await AsyncStorage.setItem(metadataKey, JSON.stringify(cacheMetadata));
    } catch (error) {
      console.error('Error updating cache metadata:', error);
    }
  }

  async removeCacheMetadata(key) {
    try {
      const metadataKey = `${this.CACHE_PREFIX}metadata`;
      const metadata = await AsyncStorage.getItem(metadataKey);
      if (metadata) {
        const cacheMetadata = JSON.parse(metadata);
        delete cacheMetadata[key];
        await AsyncStorage.setItem(metadataKey, JSON.stringify(cacheMetadata));
      }
    } catch (error) {
      console.error('Error removing cache metadata:', error);
    }
  }

  // Clear all cache
  async clearAllCache() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
      await AsyncStorage.multiRemove(cacheKeys);
      console.log(`🗑️ Cleared ${cacheKeys.length} cache entries`);
      return true;
    } catch (error) {
      console.error('❌ Error clearing cache:', error);
      return false;
    }
  }

  // Get cache size and info
  async getCacheInfo() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));

      let totalSize = 0;
      const entries = [];

      for (const key of cacheKeys) {
        try {
          const data = await AsyncStorage.getItem(key);
          const size = data ? data.length : 0;
          totalSize += size;
          entries.push({key, size});
        } catch (error) {
          console.error(`Error getting size for ${key}:`, error);
        }
      }

      return {
        totalEntries: cacheKeys.length,
        totalSize,
        entries,
      };
    } catch (error) {
      console.error('Error getting cache info:', error);
      return {totalEntries: 0, totalSize: 0, entries: []};
    }
  }
}

// Export singleton instance
export const cacheManager = new CacheManager();
export default cacheManager;
