interface ConfigObject {
  default?: any;
  env: string;
  allowed?: string[];
}

interface ParentConfigObject {
  [key: string]: ConfigObject | ParentConfigObject;
}

export default function appConfig(configObj: {
  [key: string]: ConfigObject | ParentConfigObject;
}) {
  const stringToResult = (obj: any, path: string) => {
    const parsed = path.split('.');
    if (parsed.length === 0) {
      return null;
    }

    let val = obj;
    parsed.forEach(p => {
      if (val[p]) {
        val = val[p];
      } else {
        return null;
      }
    });

    return val;
  };

  const get = (path: string) => {
    const attr = stringToResult(configObj, path);
    let result;
    if (attr.env && process.env[attr.env]) {
      result = process.env[attr.env];
    } else if (attr.default) {
      result = attr.default;
    } else {
      return null;
    }

    if (result && attr.allowed?.indexOf(result) === -1) {
      throw new Error(
        `${result} is not one of the available options: ${attr.options}`
      );
    }

    return result;
  };

  return {
    get,
  };
}
