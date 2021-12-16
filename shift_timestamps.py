import json

with open('./data/timestamps2.json') as f:
    data = json.load(f)

# constellations offset 11 29 - 4 12 = 7 17
# portal offset 43 18 - 42 4 = 1 14
offset_s, offset_f = map(int, input('Offset_s, Offset_f: ').split())
start_from = int(input('Start from: '))

print('Starting from:', data[start_from]['title'])

for item in data[start_from:]:
    item['time_s'] = item['time_s'] + offset_s + (item['time_f'] + offset_f) // 30
    item['time_f'] = (item['time_f'] + offset_f) % 30

with open('./data/timestamps3.json', 'w+') as f:
    f.write(json.dumps(data))
