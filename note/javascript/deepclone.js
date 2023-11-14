/*
    实现深拷贝
    1. 判断正则对象
    2. 判断日期对象
    3. 属性对象直接进行递归拷贝
    4. 考虑拷贝时不能丢失原本对象的原型继承关系
    5. 考虑拷贝时的属性修饰符
    6. 判断循环引用
  */
function cloneDeep(value, map = new WeakMap()) {
  if (value.constructor === Date) {
    return new Date(value);
  }
  if (value.constructor === RegExp) {
    return new RegExp(value.valueOf());
  }
  // 如果value是普通类型 直接返回
  if (typeof value !== "object" || value === null) {
    return value;
  }
  // 考虑对象的原型 获得原本对象的原型 创建一个新的对象继承这个对象的原型
  const prototype = Object.getPrototypeOf(value);
  // 考虑拷贝时不能 丢失对原有对象的属性描述符
  const description = Object.getOwnPropertyDescriptors(value);
  // 创建新的空对象 同时继承原有对象原型 同时拥有对应的描述符
  const object = Object.create(prototype, description);
  // 遍历对象的属性 进行拷贝 Reflect.ownKeys 遍历获取自身的不可枚举以及key为Symbol的属性
  map.set(value, object);
  Reflect.ownKeys(value).forEach((key) => {
    // key是普通类型
    if (typeof key !== object || key === null) {
      // 直接覆盖
      object[key] = value[key];
    } else {
      //  解决循环引用的关键是 每一个对象都给他存放在weakMap中 因为WeakMap是一个弱引用
      //  每次如果进入是对象 那么就把这个对象 优先存放在weakmap中 之后如果还有引用这个对象的地方 直接从weakmap中拿出来 而不需要再进行遍历造成爆栈
      //  同理，如果使用相同引用为了保证同一份引用地址的话 可以使用weakMap中直接拿出保证同一份引用
      //  这里判断之前是否存在相同的引用 如果存在相同的引用直接返回引用即可
      const mapValue = map.get(value);
      mapValue
        ? (object[key] = map.get(value))
        : (object[key] = cloneDeep(value[key]));
    }
  });
  return object;
}

let obj = {
  age: 18,
  name: "dota",
  boolean: true,
  empty: undefined,
  nul: null,
  customObj: { name: "dota" },
  customArr: [0, 1, 2],
  customFn: () => console.log("dota"),
  date: new Date(1000),
  reg: new RegExp("/dota/ig"),
  [Symbol("hello")]: "dota",
};

// obj.xxx = obj

// console.log(typeof obj.date);

const cloneObj = cloneDeep(obj)
// const cloneObj = JSON.parse(JSON.stringify(obj))
console.log(typeof cloneObj.date);