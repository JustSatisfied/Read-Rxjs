const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});
 
console.log('just before subscribe');
observable.subscribe({
  next(x) {
    console.log('got value ' + x);
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    console.log('done');
  },
});


Rxjs


- 观察者模式


new Observable(fn)    

this.__subscribe=fn



observable.subscribe(obj)

首先是要判断fn是不是一个Subscriber对象,如果不是Subscriber对象，那么obj将会重新构建一个新得Subscriber对象,后面都是嵌套性得判断是否是ConsumerObserver...
ConsumerObserver其实就是判断是否是一个对象{next:,err,complete} 

ConsumerObserver 具备基本得消费属性，



subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null): Subscription {
    const subscriber = observerOrNext instanceof Subscriber ? observerOrNext : new Subscriber(observerOrNext);
    subscriber.add(this._trySubscribe(subscriber));
    return subscriber;
}


this._trySubscribe(subscriber)

subscriber已经被包装成一个Subscriber对象，传入之后
(subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
}


subscriber.next()