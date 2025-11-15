import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const GoogleTranslate = forwardRef((props, ref) => {
  const translateElementRef = useRef(null);
  const scriptLoadedRef = useRef(false);
  const translateInstanceRef = useRef(null);

  const changeLanguage = (languageCode) => {
    if (!window.google || !window.google.translate) {
      console.warn('Google Translate not loaded yet');
      return;
    }

    try {
      const selectElement = document.querySelector('.goog-te-combo');
      if (selectElement) {
        selectElement.value = languageCode;
        selectElement.dispatchEvent(new Event('change'));
      } else {
        document.cookie = `googtrans=/en/${languageCode};path=/;max-age=31536000`;
        window.location.reload();
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  useImperativeHandle(ref, () => ({
    changeLanguage,
    isLoaded: () => scriptLoadedRef.current && !!window.google?.translate
  }));

  const initializeTranslate = () => {
    if (!window.google || !window.google.translate || !translateElementRef.current) {
      return;
    }

    try {
      translateInstanceRef.current = new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr,es,de,it,pt,zh-CN,ja,ko,ar,hi,ru,pl,nl,sv,da,fi,no,tr,vi,th,id,ms,uk,cs,ro,hu,el,he,fa,bn,ta,te,ml,kn,gu,pa',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        },
        'google_translate_element'
      );
    } catch (error) {
      console.error('Error initializing Google Translate:', error);
    }
  };

  useEffect(() => {
    const hideGoogleTranslateElements = () => {
      const selectors = [
        '.goog-te-banner-frame',
        '.goog-te-banner-frame.skiptranslate',
        '#google_translate_element',
        '.goog-te-gadget',
        '.goog-te-gadget-simple',
        '.goog-te-menu-frame',
        '.goog-te-menu-value',
        '.goog-te-combo',
        '.goog-te-menu',
        '.goog-te-menu2',
        '.goog-te-gadget-icon',
        '.skiptranslate',
        'iframe.goog-te-banner-frame',
        'iframe.goog-te-menu-frame',
        'select.goog-te-combo'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el instanceof HTMLElement) {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.height = '0';
            el.style.width = '0';
            el.style.position = 'absolute';
            el.style.left = '-9999px';
          }
        });
      });
    };

    const observer = new MutationObserver(() => {
      hideGoogleTranslateElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    hideGoogleTranslateElements();

    if (scriptLoadedRef.current) {
      return () => {
        observer.disconnect();
      };
    }

    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (existingScript) {
      scriptLoadedRef.current = true;
      if (window.google && window.google.translate && translateElementRef.current) {
        initializeTranslate();
        setTimeout(hideGoogleTranslateElements, 100);
      }
      return () => {
        observer.disconnect();
      };
    }

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      hideGoogleTranslateElements();
    };

    script.onerror = () => {
      console.error('Failed to load Google Translate script');
    };

    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        initializeTranslate();
        setTimeout(hideGoogleTranslateElements, 100);
      }
    };

    return () => {
      observer.disconnect();
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement) {
        translateElement.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="google-translate-wrapper">
      <div 
        id="google_translate_element" 
        ref={translateElementRef}
        className="inline-block"
      />
      <style>{`
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        #google_translate_element,
        .goog-te-gadget,
        .goog-te-gadget-simple,
        .goog-te-menu-frame,
        .goog-te-menu-value,
        .goog-te-combo,
        .goog-te-menu,
        .goog-te-menu2,
        .goog-te-gadget-icon,
        .skiptranslate,
        iframe.goog-te-banner-frame,
        iframe.goog-te-menu-frame,
        select.goog-te-combo {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          position: absolute !important;
          left: -9999px !important;
        }
        
        body {
          top: 0 !important;
        }
      `}</style>
    </div>
  );
});

GoogleTranslate.displayName = 'GoogleTranslate';

export default GoogleTranslate;

