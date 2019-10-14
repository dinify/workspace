
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

export const substitute = (string: string, vars: any) => {
  try {
    return eval(`(() => { const { ${Object.keys(vars).join(',')} } = vars; return \`${string}\`; })()`);
  } catch(e) {
    return string;
  }
}

// export const substitute = (string: string, vars: any) => 
//   new Function(`(() => { const { ${Object.keys(vars).join(',')} } = this.vars; return \`${string}\`; })()`).call({vars});