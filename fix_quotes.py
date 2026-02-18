#!/usr/bin/env python3
import re

with open('src/constants/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace curly quotes with straight quotes
content = content.replace('\u201c', '"')  # Left double quote
content = content.replace('\u201d', '"')  # Right double quote  
content = content.replace('\u2018', "'")  # Left single quote
content = content.replace('\u2019', "'")  # Right single quote

with open('src/constants/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print('Quotes fixed!')
