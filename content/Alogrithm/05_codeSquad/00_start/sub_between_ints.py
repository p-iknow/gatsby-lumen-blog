def solution(a, b):
    answer = 0
    if a==b:
        return a
    #대소비교로 순서 결정해서 서로의 변수를 바꿔주는 설정!!
    if b < a:
        a,b = b,a

    for x in range(a,b+1):
        answer += x
    return answer