export const customValidationFormat = (object: any) => {
  let obj: any = {};

  for (let key in object) {
    obj[key] = object[key]["msg"];
  }

  return obj;
};

export const validationErrorFormat = (object: any) => {
  let obj: any = {};

  for (let i = 0; i < object.length; i++) {
    obj[object[i].path] = object[i].message;
  }

  return obj;
};
