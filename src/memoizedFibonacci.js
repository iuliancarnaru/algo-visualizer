function memoizedFib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  let res = memoizedFib(n - 1, memo) + memoizedFib(n - 2, memo);
  memo[n] = res;
  return res;
}

function memoizedFib2(n, memo = [undefined, 1 , 1]) {
  if (memo[n] !== undefined) return memo[n];
  let res = memoizedFib(n - 1, memo) + memoizedFib(n - 2, memo);
  memo[n] = res;
  return res;
}

memoizedFib(45);
memoizedFib2(50);