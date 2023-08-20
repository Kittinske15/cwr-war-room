import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

export default function PingAnChart() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview_094b0') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "SSE:510390",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: "tradingview_094b0"
          });
        }
      }
    },
    []
  );

  return (
    <div className='tradingview-widget-container'>
      <div className='tradingview-chart' id='tradingview_094b0' />
    </div>
  );
}
