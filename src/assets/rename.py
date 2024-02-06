import os

for file_name in os.listdir():
    if file_name.endswith('.png') and file_name.startswith('未命名00216'):
        new_file_name = file_name.replace('未命名00216', '')
        os.rename(file_name, new_file_name)