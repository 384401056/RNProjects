import React from 'react';

class Person{
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
 
// class American  extends Person {
// }

// class Chiness extends Person{

// }

// const a1 =  new American("Jack", 20); //子类对象，调用父类构造方法
//  console.log(a1);


//  const c1 =  new Chiness("张三", 20); //子类对象，调用父类构造方法
//  console.log(c1);


class American  extends Person {
  constructor(name, age){
    super(name, age);
  }
}

const a1 =  new American("Jack", 20); //子类对象，调用自身构造器.
 console.log(a1);

class Chiness extends Person{
  constructor(name, age){
    super(name, age);
  }
}

 const c1 =  new Chiness("张三", 20); //子类对象，调用自身构造器.
 console.log(c1);
