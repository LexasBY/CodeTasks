// ✅ Фибоначчи через for (до n)
function fibonacciBelow(n) {
    const result = [];
  
    let a = 0;
    let b = 1;
  
    for (; a < n;) {
      result.push(a);
  
      const next = a + b;
      a = b;
      b = next;
    }
  
    return result;
  }

  // ❌ Рекурсия — плохой выбор здесь (но знать надо)
  function recursiveFib(n, a = 0, b = 1, result = []) {
    if (a >= n) return result;
    result.push(a);
    return recursiveFib(n, b, a + b, result);
  }

  //✅ Простой рабочий вариант (итеративно)
  function fibonacciBelow(n) {
    const result = [];
    let a = 0, b = 1;
  
    while (a < n) {
      result.push(a);
      [a, b] = [b, a + b]; // swap и вычисление следующего
    }
  
    return result;
  }
