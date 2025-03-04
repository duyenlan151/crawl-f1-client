import { useState } from 'react';
import Button from '@/components/ui/button';
import toast from 'react-hot-toast';

const CrawlButton = () => {
  const [loading, setLoading] = useState(false);

  const handleCrawl = async () => {
    setLoading(true);
    // toast.loading("Crawling data...", { id: "crawl" });

    try {
      const response = await fetch('http://localhost:3000/crawl', {
        method: 'GET',
      });
      if (!response.ok) throw new Error('Crawl failed');

      toast.success('Crawl successful!', { id: 'crawl' });
    } catch (error) {
      toast.error('Crawl failed!', { id: 'crawl' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      label={loading ? 'Crawling...' : 'Crawl'}
      onClick={handleCrawl}
      disabled={loading}
      className={loading ? 'opacity-50 cursor-not-allowed' : ''}
    />
  );
};

export default CrawlButton;
