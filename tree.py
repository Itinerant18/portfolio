import os
import json

ig = {'.git', 'node_modules', '.next', '.agent', 'daily-progress'}
files = []
for root, dirs, fl in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ig]
    for f in fl:
        if not f.endswith(('.png', '.jpg', '.webp')):
            files.append(os.path.relpath(os.path.join(root, f), '.').replace('\\', '/'))

with open('tree.txt', 'w') as f:
    f.write('\n'.join(files))
