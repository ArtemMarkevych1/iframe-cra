import React, { useEffect, useRef } from 'react';

interface DynamicIframeComponentProps {
  src: string;
  width?: string;
  height?: string;
}

const TODOLOL: React.FC<DynamicIframeComponentProps> = ({
  src,
  width = '100%',
  height = '300px',
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      if (iframeRef.current) {
        const iframeContentHeight = iframeRef.current.contentWindow?.document.documentElement.scrollHeight;
        if (iframeContentHeight) {
          iframeRef.current.style.height = `${iframeContentHeight}px`;
        }
      }
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      width={width}
      height={height}
      frameBorder="0"
      style={{ width: '100%' }}
    />
  );
};

export default TODOLOL;