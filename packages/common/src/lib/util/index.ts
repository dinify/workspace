
export const pipe = (...fns: ((...p: any[]) => any)[]) => (x: any) => fns.reduce((v, f) => f(v), x);

export const scan = (o: object, cb: (path: string[], value: any) => void) => {
  const scanInner = (obj: any, keys: string[]) => {
    let k = '';
    if (obj instanceof Object) {
      for (k in obj){
        if (obj.hasOwnProperty(k)) scanInner(obj[k], [...keys, k]);             
      }
    } else cb(keys, obj);
  };
  scanInner(o, []);
};

export const path = (path: string|string[]) => 
  path instanceof Array ? 
    path.map((p: string) => p.split('.')).reduce((acc, curr) => [ ...acc, ...curr]) : 
    path.split('.');

export const substitute = (string: string, vars: any): string => {
  try {
    return eval(`(() => { const { ${Object.keys(vars).join(',')} } = vars; return \`${string}\`; })()`);
  } catch(e) {
    return string;
  }
}

export const flatten = (obj: any) => {
  let result: any = {};
  const flattenFunc = (obj: any, flattenedKey: string) => {
    var k;
    if (obj instanceof Object) {
      for (k in obj) {
        if (obj.hasOwnProperty(k)) {
          flattenFunc(obj[k], flattenedKey !== '' ? flattenedKey + "." + k : k);
        }
      }
    } else {
      result[flattenedKey] = obj;
    }
  };
  flattenFunc(obj, '');
  return result;
};

export const deflatten = (paths: any) => {
  const buildFromSegments = (scope: any, pathSegments: any, value: any) => {
    const current = pathSegments.shift();
    const found = scope[current];
    if (!found) {
      scope[current] = {};
    }
    if (pathSegments.length) {
      buildFromSegments(scope[current], pathSegments, value);
    } else {
      scope[current] = value;
    }
  };
  var result = {};
  Object.keys(paths).forEach(path => {
    const value = paths[path];
    buildFromSegments(result, path.split("."), value);
  });

  return result;
};

// export const substitute = (string: string, vars: any) => 
//   new Function(`(() => { const { ${Object.keys(vars).join(',')} } = this.vars; return \`${string}\`; })()`).call({vars});