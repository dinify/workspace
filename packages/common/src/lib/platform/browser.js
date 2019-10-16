// Source
// https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser
export const getName = () => {
    // Opera 8.0+
    let isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    if (isOpera) {
      return 'opera';
    }
  
    // Firefox 1.0+
    if (typeof InstallTrigger !== 'undefined') {
      return 'firefox';
    }
  
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof window.safari !== 'undefined' && window.safari.pushNotification))) {
      return 'safari';
    }
    if (!!window.ApplePaySession) return 'safari';
  
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    if (isIE) {
      return 'ie';
    }
  
    // Edge 20+
    if (!isIE && !!window.StyleMedia) {
      return 'edge';
    }
  
    // Chrome 1 - 71
    let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    if (isChrome) {
      return 'chrome';
    }
  
    // Blink engine detection
    if ((isChrome || isOpera) && !!window.CSS) {
      return 'blink';
    }
  
    return null;
  }