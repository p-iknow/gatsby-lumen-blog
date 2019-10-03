

### python solution

```python
def dfs(graph, start_node):
    visit = list()
    stack = list()
    stack.append(start_node)

    while stack:
        node = stack.pop()
        if node not in visit:
            visit.append(node)
            stack.extend(graph[node])

    return visit


def solution(n, computers):
    graph = {node: [] for node in range(n)}

    for i, computer in enumerate(computers):
        for j, conn in enumerate(computer):
            if i != j and conn == 1:
                graph[i].append(j)

    paths = map(sorted, [dfs(graph, node) for node in graph])

    return len(set(["".join(map(str, path)) for path in paths]))

```

#### extend 

[append()](https://docs.python.org/2/library/array.html?highlight=append#array.array.append)는 object를 맨 뒤에 추가합니다.

```python
x = [1, 2, 3]
x.append([4, 5])
print (x)
[1, 2, 3, [4, 5]]
```

[extend()](https://docs.python.org/2/library/array.html?highlight=append#array.array.extend)는 iterable 객체(리스트, 튜플, 딕셔너리 등)의 엘레멘트를 list에 appending시킵니다.

```python
x = [1, 2, 3]
x.extend([4, 5])
print (x)
[1, 2, 3, 4, 5]
```