from collections import defaultdict

d = defaultdict(set)

with open('data.txt', encoding='utf-8') as f:
    for line in f:
        v, k, *_ = line.rstrip('\n').split('\t')
        d[k].add(v)

with open('data_filtered.txt', 'w', encoding='utf-8') as f:
    for k, vs in d.items():
        v = '/'.join(vs)
        if len(v) <= 5:
            print(k, v, sep='\t', file=f)
