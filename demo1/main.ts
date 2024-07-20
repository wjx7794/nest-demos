function CustomMethodDecorator(info: string): MethodDecorator {
  return (
    target: Object,
    methodName: any,
    propertyDescriptor: PropertyDescriptor
  ) => {
    console.log(target);
    console.log(methodName);

    const oldFunction = target[methodName]; // 获取方法引用
    const newFunction = function (...args: any[]) {
      console.log(`its's ${info}`);
      oldFunction.call(target, ...args);
    };
    propertyDescriptor.value = newFunction; // 替换原声明
  };
}

class User {
  @CustomMethodDecorator('Jack')
  sayHello() {
    console.log('hello!');
  }
}

const u = new User();
u.sayHello();

// 输出:
// {}
// sayHello
// its's Jack
// hello!
