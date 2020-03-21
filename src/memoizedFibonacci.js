function memoizedFib(n, memo = []) {
  if (memo[n] !== undefined) return memo[n];
  if (n <= 2) return 1;
  let res = memoizedFib(n - 1, memo) + memoizedFib(n - 2, memo);
  memo[n] = res;
  return res;
}

memoizedFib(45);