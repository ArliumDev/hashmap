class HashMap {
  constructor(loadFactor, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.buckets = new Array(this.capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    for (let pair of this.buckets[index]) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }
    this.buckets[index].push([key, value]);

    if (this.length() / this.capacity > this.loadFactor) {
      this._resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return null;
    for (let pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    for (let pair of bucket) {
      if (pair[0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    if (!bucket) return false;
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let count = 0;
    for (const bucket of this.buckets) {
      if (bucket) {
        count += bucket.length;
      }
    }
    return count;
  }

  clear() {
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let keysArr = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const pair of bucket) {
          keysArr.push(pair[0]);
        }
      }
    }
    return keysArr;
  }

  values() {
    let valuesArr = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const pair of bucket) {
          valuesArr.push(pair[1]);
        }
      }
    }
    return valuesArr;
  }

  entries() {
    let entriesArr = [];
    for (const bucket of this.buckets) {
      if (bucket) {
        for (const pair of bucket) {
          entriesArr.push(pair);
        }
      }
    }
    return entriesArr;
  }
  _resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);

    for (const bucket of oldBuckets) {
      if (bucket) {
        for (const pair of bucket) {
          this.set(pair[0], pair[1]);
        }
      }
    }
  }
}

const test = new HashMap(0.75);

test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log('Capacity:', test.capacity); 
console.log('Length:', test.length());   
console.log('Load level:', test.length() / test.capacity); 

test.set('apple', 'verde');
test.set('banana', 'amarillo intenso');
test.set('lion', 'dorado');

console.log('Length after overwrite:', test.length()); 
console.log('Capacity after overwrite:', test.capacity); 

test.set('moon', 'silver');

console.log('Capacity after resize:', test.capacity); 
console.log('Length after resize:', test.length());  
console.log('Load level after resize:', test.length() / test.capacity); 

test.set('moon', 'gris plateado');
test.set('dog', 'marrón oscuro');

console.log('Length after second overwrite:', test.length()); 
console.log('Capacity after second overwrite:', test.capacity); 

console.log('get("moon"):', test.get('moon'));
console.log('has("lion"):', test.has('lion'));
console.log('has("cat"):', test.has('cat'));  

console.log('remove("kite"):', test.remove('kite')); 
console.log('remove("cat"):', test.remove('cat'));   
console.log('Length after remove:', test.length());  

console.log('keys:', test.keys());     
console.log('values:', test.values()); 
console.log('entries:', test.entries()); 


test.clear();
console.log('Length after clear:', test.length()); 
console.log('keys after clear:', test.keys());     
console.log('values after clear:', test.values());