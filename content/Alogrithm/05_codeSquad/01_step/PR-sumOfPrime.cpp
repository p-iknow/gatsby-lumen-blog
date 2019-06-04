long long solution(int N) { long long answer = 0; 
    vector<bool> sieve(N+1); // 에라토네스의 체 (default: false) 
    for (int i = 2; i <= N; ++i) { 
        if (sieve[i] == false) { 
            answer += i; 
            } 
        for (int j = i; j <= N; j+=i) { 
            sieve[j] = true; }
             } 
    return answer; 
}

