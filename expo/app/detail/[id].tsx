import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, ChevronLeft, ChevronRight, Share2 } from 'lucide-react-native';
import { WebView } from 'react-native-webview';

export default function DetailScreen() {
  const { id, page: initialPage } = useLocalSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(parseInt(initialPage as string) || 1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [webViewKey, setWebViewKey] = useState<number>(0);

  const issueId = '2025-37';
  const baseUrl = 'https://kienthuc.net.vn/epaper';
  
  const generateUrl = (page: number): string => {
    return `${baseUrl}/${issueId}/${page}/`;
  };

  const currentUrl = generateUrl(currentPage);
  
  const magazineData = {
    id: issueId,
    title: `Khoa học và Đời sống số ${issueId}`,
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setIsLoading(true);
      setWebViewKey(prev => prev + 1);
      console.log(`Navigating to page ${newPage}`);
    }
  };

  const goToNextPage = () => {
    const newPage = currentPage + 1;
    setCurrentPage(newPage);
    setIsLoading(true);
    setWebViewKey(prev => prev + 1);
    console.log(`Navigating to page ${newPage}`);
  };

  const handleLoadEnd = () => {
    setIsLoading(false);
    console.log(`Page ${currentPage} loaded successfully`);
  };

  const handleLoadError = () => {
    setIsLoading(false);
    console.log(`Failed to load page ${currentPage}`);
  };

  useEffect(() => {
    console.log(`Current URL: ${currentUrl}`);
  }, [currentUrl]);

  const renderWebContent = () => {
    if (Platform.OS === 'web') {
      return (
        <iframe
          key={webViewKey}
          src={currentUrl}
          style={styles.iframe}
          onLoad={handleLoadEnd}
          onError={handleLoadError}
        />
      );
    } else {
      return (
        <WebView
          key={webViewKey}
          source={{ uri: currentUrl }}
          style={styles.webView}
          onLoadEnd={handleLoadEnd}
          onError={handleLoadError}
          startInLoadingState={true}
          scalesPageToFit={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          testID="back-button"
        >
          <ArrowLeft color="#fff" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {magazineData.title}
          </Text>
        </View>
      </View>

      {/* Main Content - WebView/iframe */}
      <View style={styles.contentContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff6b35" />
            <Text style={styles.loadingText}>Đang tải trang {currentPage}...</Text>
          </View>
        )}
        {renderWebContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#000',
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  webView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    zIndex: 1,
  },
  loadingText: {
    color: '#333',
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  pageInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  currentPageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: '#fff',
  } as any,
});