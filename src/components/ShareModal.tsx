import React, { useState, useRef, useEffect } from 'react';
import { X, Download, Copy, Check, Share2, Calendar, MapPin, Trophy, Users, ExternalLink, Heart } from 'lucide-react';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../config/firebase';
import { SuccessStory } from '../types/auth';

// Social Media Icons Components
const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const RedditIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  story?: SuccessStory | null;
  hackathon?: any;
  type: 'story' | 'hackathon';
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, story, hackathon, type }) => {
  const [copied, setCopied] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareCount, setShareCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const data = type === 'story' ? story : hackathon;

  useEffect(() => {
    if (data && isOpen) {
      generateShareUrl();
      loadShareCount();
    }
  }, [data, isOpen]);

  const generateShareUrl = () => {
    if (!data) return;
    
    const baseUrl = window.location.origin;
    const storySlug = data.companyStartupName 
      ? data.companyStartupName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      : 'story';
    
    const url = `${baseUrl}/success-stories/${data.id}?utm_source=share&utm_medium=social&utm_campaign=catalyseed_stories&story=${storySlug}`;
    setShareUrl(url);
  };

  const loadShareCount = async () => {
    if (!data?.id) return;
    
    try {
      const docRef = doc(db, type === 'story' ? 'successStories' : 'hackathons', data.id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const docData = docSnap.data();
        setShareCount(docData.shareCount || 0);
      }
    } catch (error) {
      console.error('Error loading share count:', error);
    }
  };

  const incrementShareCount = async () => {
    if (!data?.id) return;
    
    try {
      const docRef = doc(db, type === 'story' ? 'successStories' : 'hackathons', data.id);
      await updateDoc(docRef, {
        shareCount: increment(1),
        lastShared: new Date().toISOString()
      });
      setShareCount(prev => prev + 1);
    } catch (error) {
      console.error('Error updating share count:', error);
    }
  };

  const generateShareImage = async (): Promise<void> => {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        resolve();
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve();
        return;
      }

      // Set canvas size for social media optimal dimensions (1200x630)
      canvas.width = 1200;
      canvas.height = 630;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#7c3aed');
      gradient.addColorStop(0.5, '#a855f7');
      gradient.addColorStop(1, '#ec4899');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add pattern overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      for (let i = 0; i < canvas.width; i += 100) {
        for (let j = 0; j < canvas.height; j += 100) {
          ctx.fillRect(i, j, 50, 50);
        }
      }

      // Main content area
      const contentPadding = 60;
      const contentWidth = canvas.width - (contentPadding * 2);
      const contentHeight = canvas.height - (contentPadding * 2);

      // White content background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fillRect(contentPadding, contentPadding, contentWidth, contentHeight);

      let currentY = contentPadding + 40;

      // Catalyseed branding
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 32px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('✨ Catalyseed', contentPadding + 40, currentY);

      ctx.fillStyle = '#a855f7';
      ctx.font = '18px Arial, sans-serif';
      ctx.fillText('Tamil Nadu Innovation Platform', contentPadding + 40, currentY + 30);

      currentY += 80;

      // Story/Hackathon image
      const imageSize = 200;
      const imageX = contentPadding + 40;
      const imageY = currentY;

      if (data.productServicePictures?.[0] || data.inventorPhoto || data.image) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          ctx.save();
          // Create rounded rectangle clipping path
          ctx.beginPath();
          ctx.roundRect(imageX, imageY, imageSize, imageSize, 15);
          ctx.clip();
          ctx.drawImage(img, imageX, imageY, imageSize, imageSize);
          ctx.restore();
          
          // Add border
          ctx.strokeStyle = '#7c3aed';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(imageX, imageY, imageSize, imageSize, 15);
          ctx.stroke();
        };
        img.src = data.productServicePictures?.[0] || data.inventorPhoto || data.image || '';
      } else {
        // Fallback gradient box
        const imgGradient = ctx.createLinearGradient(imageX, imageY, imageX + imageSize, imageY + imageSize);
        imgGradient.addColorStop(0, '#f3e8ff');
        imgGradient.addColorStop(1, '#fce7f3');
        ctx.fillStyle = imgGradient;
        ctx.fillRect(imageX, imageY, imageSize, imageSize);
        
        // Add icon
        ctx.fillStyle = '#7c3aed';
        ctx.font = '64px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(type === 'story' ? '🚀' : '🏆', imageX + imageSize/2, imageY + imageSize/2 + 20);
      }

      // Content area next to image
      const textX = imageX + imageSize + 40;
      const textWidth = contentWidth - imageSize - 120;

      // Title
      ctx.fillStyle = '#1f2937';
      ctx.font = 'bold 36px Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      const title = type === 'story' 
        ? (data.companyStartupName || 'Untitled Startup')
        : (data.title || 'Untitled Event');
      
      // Word wrap for title
      const titleWords = title.split(' ');
      let titleLine = '';
      const titleLineHeight = 45;
      let titleY = currentY;
      
      for (let i = 0; i < titleWords.length; i++) {
        const testLine = titleLine + titleWords[i] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > textWidth && i > 0) {
          ctx.fillText(titleLine.trim(), textX, titleY);
          titleLine = titleWords[i] + ' ';
          titleY += titleLineHeight;
          if (titleY > currentY + titleLineHeight * 2) break; // Max 2 lines
        } else {
          titleLine = testLine;
        }
      }
      ctx.fillText(titleLine.trim(), textX, titleY);

      // Subtitle
      currentY += 120;
      ctx.fillStyle = '#6b7280';
      ctx.font = '20px Arial, sans-serif';
      
      const subtitle = type === 'story' 
        ? `by ${data.innovatorName || 'Unknown'} • ${data.studentAlumniOf || 'Unknown Institute'}`
        : `${data.organizer || 'Unknown'} • ${data.location || 'Unknown Location'}`;
      
      ctx.fillText(subtitle, textX, currentY);

      // Description
      currentY += 40;
      ctx.fillStyle = '#4b5563';
      ctx.font = '18px Arial, sans-serif';
      
      const description = type === 'story' 
        ? (data.aboutStartup || 'No description available')
        : (data.description || 'No description available');
      
      const descWords = description.split(' ').slice(0, 25).join(' ') + '...';
      const descLines = [];
      const descWordsArray = descWords.split(' ');
      let descLine = '';
      
      for (let i = 0; i < descWordsArray.length; i++) {
        const testLine = descLine + descWordsArray[i] + ' ';
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > textWidth && i > 0) {
          descLines.push(descLine.trim());
          descLine = descWordsArray[i] + ' ';
          if (descLines.length >= 3) break; // Max 3 lines
        } else {
          descLine = testLine;
        }
      }
      if (descLine.trim()) descLines.push(descLine.trim());

      descLines.forEach((line, index) => {
        ctx.fillText(line, textX, currentY + (index * 25));
      });

      // Stats/Details section
      currentY += 120;
      ctx.fillStyle = '#374151';
      ctx.font = '16px Arial, sans-serif';
      
      if (type === 'story') {
        const stats = [
          `📍 ${data.businessAddress?.split(',')[0] || 'Unknown Location'}`,
          `🏢 ${data.studentAlumniOf || 'Unknown Institute'}`,
          `🚀 ${data.currentStage || 'Unknown Stage'}`,
          `📅 Founded ${data.yearOfInnovation || 'Unknown'}`
        ];
        
        stats.forEach((stat, index) => {
          const x = textX + (index % 2) * (textWidth / 2);
          const y = currentY + Math.floor(index / 2) * 25;
          ctx.fillText(stat, x, y);
        });
      } else {
        const stats = [
          `📅 ${data.date || 'TBD'}`,
          `📍 ${data.location || 'Unknown'}`,
          `🏆 ${data.prizePool || 'TBD'}`,
          `👥 ${data.participants || 'TBD'} participants`
        ];
        
        stats.forEach((stat, index) => {
          const x = textX + (index % 2) * (textWidth / 2);
          const y = currentY + Math.floor(index / 2) * 25;
          ctx.fillText(stat, x, y);
        });
      }

      // Footer
      const footerY = canvas.height - 80;
      
      // Tamil Nadu pride
      ctx.fillStyle = '#7c3aed';
      ctx.font = 'bold 18px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🌟 Proudly from Tamil Nadu', canvas.width / 2, footerY);
      
      // Website
      ctx.fillStyle = '#9ca3af';
      ctx.font = '16px Arial, sans-serif';
      ctx.fillText('Discover more at catalyseed.com', canvas.width / 2, footerY + 25);

      // QR code placeholder (you could integrate a QR code library here)
      const qrSize = 80;
      const qrX = canvas.width - contentPadding - qrSize;
      const qrY = footerY - 40;
      
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(qrX, qrY, qrSize, qrSize);
      ctx.fillStyle = '#6b7280';
      ctx.font = '12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Scan to', qrX + qrSize/2, qrY + qrSize/2 - 5);
      ctx.fillText('View', qrX + qrSize/2, qrY + qrSize/2 + 10);

      setTimeout(() => resolve(), 100);
    });
  };

  const downloadImage = async () => {
    setIsGenerating(true);
    
    try {
      await generateShareImage();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const fileName = type === 'story' 
            ? `catalyseed-story-${data.companyStartupName?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'story'}.png`
            : `catalyseed-hackathon-${data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'event'}.png`;
          
          link.download = fileName;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          
          incrementShareCount();
        }
      }, 'image/png', 1.0);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      incrementShareCount();
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

  const shareToSocial = (platform: string) => {
    const title = type === 'story' 
      ? `${data.companyStartupName} by ${data.innovatorName}`
      : data.title;
    
    const description = type === 'story' 
      ? data.aboutStartup 
      : data.description;
    
    const hashtags = type === 'story'
      ? ['TamilNaduStartups', 'Innovation', 'Entrepreneurship', data.innovationCategory?.replace(/\s+/g, '')]
      : ['TamilNaduHackathon', 'Innovation', 'TechEvent'];
    
    const shareText = `🚀 ${title}\n\n${description?.substring(0, 100)}...\n\n#Catalyseed ${hashtags.map(tag => `#${tag}`).join(' ')}`;

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description?.substring(0, 200) || '')}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
      incrementShareCount();
    }
  };

  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
        
        <div className="inline-block w-full max-w-4xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Share {type === 'story' ? 'Success Story' : 'Hackathon'}
                </h3>
                <p className="text-gray-600 text-sm">
                  Spread the word about Tamil Nadu's innovation • {shareCount} shares
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Enhanced Preview Card */}
          <div className="mb-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <div className="flex items-start space-x-6">
              {/* Image */}
              <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                {(data.productServicePictures?.[0] || data.inventorPhoto || data.image) ? (
                  <img 
                    src={data.productServicePictures?.[0] || data.inventorPhoto || data.image} 
                    alt={type === 'story' ? data.companyStartupName : data.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                ) : (
                  <div className="text-4xl">
                    {type === 'story' ? '🚀' : '🏆'}
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">
                  {type === 'story' ? data.companyStartupName : data.title}
                </h4>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-relaxed">
                  {type === 'story' ? data.aboutStartup : data.description}
                </p>
                
                {/* Enhanced Details Grid */}
                <div className="grid grid-cols-2 gap-3 text-xs text-gray-500 mb-3">
                  {type === 'story' ? (
                    <>
                      <span className="flex items-center space-x-1">
                        <span>👤</span>
                        <span>{data.innovatorName}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🏢</span>
                        <span>{data.studentAlumniOf}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{data.businessAddress?.split(',')[0]}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{data.likes || 0} likes</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>🚀</span>
                        <span>{data.currentStage}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <span>📅</span>
                        <span>{data.yearOfInnovation}</span>
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{data.date}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{data.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Trophy className="w-3 h-3" />
                        <span>{data.prizePool}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{data.participants} participants</span>
                      </span>
                    </>
                  )}
                </div>

                {/* Tags */}
                {(data.tags || data.innovationCategory) && (
                  <div className="flex flex-wrap gap-1">
                    {data.tags ? data.tags.slice(0, 3).map((tag: string, index: number) => (
                      <span key={index} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {tag}
                      </span>
                    )) : (
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        {data.innovationCategory}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer with URL Preview */}
            <div className="mt-4 pt-4 border-t border-purple-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-600 to-pink-600 rounded flex items-center justify-center">
                    <span className="text-white text-xs">✨</span>
                  </div>
                  <span className="text-sm font-medium text-purple-700">Catalyseed</span>
                </div>
                <span className="text-xs text-purple-600 font-medium">Tamil Nadu Innovation Platform</span>
              </div>
              <div className="mt-2 p-2 bg-white rounded border border-purple-200">
                <p className="text-xs text-gray-600 truncate">{shareUrl}</p>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-6">
            {/* Social Media Platforms */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Share on Social Media</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { 
                    name: 'Twitter', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: TwitterIcon,
                    title: 'Share on Twitter/X'
                  },
                  { 
                    name: 'LinkedIn', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: LinkedInIcon,
                    title: 'Share on LinkedIn'
                  },
                  { 
                    name: 'Facebook', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: FacebookIcon,
                    title: 'Share on Facebook'
                  },
                  { 
                    name: 'WhatsApp', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: WhatsAppIcon,
                    title: 'Share on WhatsApp'
                  },
                  { 
                    name: 'Telegram', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: TelegramIcon,
                    title: 'Share on Telegram'
                  },
                  { 
                    name: 'Reddit', 
                    color: 'bg-black hover:bg-gray-800', 
                    icon: RedditIcon,
                    title: 'Share on Reddit'
                  }
                ].map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <button
                      key={platform.name}
                      onClick={() => shareToSocial(platform.name.toLowerCase())}
                      className={`${platform.color} text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center justify-center transform hover:scale-105 space-y-1`}
                      title={platform.title}
                    >
                      <IconComponent />
                      <span className="text-xs font-medium">{platform.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={copyLink}
                  className="flex items-center justify-center space-x-2 p-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 transform hover:scale-105"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  <span className="font-medium">{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
                <button
                  onClick={downloadImage}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium">
                    {isGenerating ? 'Generating...' : 'Download Share Image'}
                  </span>
                </button>
              </div>
            </div>

            {/* Share Analytics */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Share Analytics</h4>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Shares</span>
                <span className="font-semibold text-purple-600">{shareCount}</span>
              </div>
            </div>
          </div>

          {/* Hidden canvas for image generation */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>
    </div>
  );
};

export default ShareModal;