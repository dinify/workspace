// import ApiModule from './zbar.generated';

const utf8BufferToString = (buffer, addr) => {
  let end = addr;
  while (buffer[end]) {
    end += 1;
  }
  const str = new Uint8Array(buffer.slice(addr, end));
  const encodedString = String.fromCharCode.apply(null, str);
  const decodedString = decodeURIComponent(escape(encodedString));
  return decodedString;
};

const Scanner = (mixin) => {
  const mod = window.Module(mixin);
  const api = {
    createBuffer: mod.cwrap('createBuffer', 'number', ['number']),
    deleteBuffer: mod.cwrap('deleteBuffer', '', ['number']),
    scanQrcode: mod.cwrap('scanQrcode', 'number', [
      'number',
      'number',
      'number'
    ]),
    getScanResults: mod.cwrap('getScanResults', 'number', [])
  };
  const scanner = {
    scanQrcode: (imgData, width, height) => {
      const buf = api.createBuffer(width * height * 4);
      mod.HEAP8.set(imgData, buf);
      const results = [];
      if (api.scanQrcode(buf, width, height)) {
        const resAddr = api.getScanResults();
        const str = utf8BufferToString(mod.HEAP8, resAddr);
        results.push(JSON.parse(str));
        api.deleteBuffer(resAddr);
      }
      return results;
    }
  };
  return new Promise((resolv, reject) => {
    mod.then(() => {
      resolv(scanner);
    });
  });
};

export default Scanner;
