import { useEffect } from 'react';

// eslint-disable-next-line no-restricted-imports
import Button from '@/components/ui/button';
import { config } from '@/config';
import { useF1Data } from '@/context/F1DataContext';
// eslint-disable-next-line no-restricted-imports
import { crawlF1Metadata } from '@/features/f1/services/f1Service';
import { useToast } from '@/hooks';
import { socketService } from '@/services/socketService';

const CrawlButton = () => {
  const { crawlLoading, progress, setCrawlProgress } = useF1Data();
  const { toast } = useToast();

  const handleCrawl = async () => {
    setCrawlProgress(0, 'Starting crawl...', true);
    toast.loading('Starting crawl...');
    try {
      socketService.connect(config.WEBSOCKET_URL, 'startCrawl', (data) => {
        const { progress, message, error } = data;

        if (error) {
          toast.error(error);
          socketService.close();
          return;
        }

        setCrawlProgress(progress || 0, message || '', progress !== 100);

        if (progress === 100) {
          toast.success(`${progress}%: ${message}`);
          setTimeout(() => socketService.close(), 1000);
        }
      });

      await crawlF1Metadata();
    } catch (error) {
      toast.error('Crawl failed!');
      setCrawlProgress(0, 'Failed to crawl', false);
      setTimeout(() => socketService.close(), 1000);
    }
  };

  useEffect(() => {
    return () => socketService.close();
  }, []);

  return (
    <Button
      label={crawlLoading ? `Crawling... (${progress}%)` : 'Crawl'}
      onClick={handleCrawl}
      disabled={crawlLoading}
      className="transition-opacity duration-300"
    />
  );
};

export default CrawlButton;
