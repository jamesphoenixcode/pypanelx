import os
import platform


if platform.system() == 'Darwin':  # macOS
    meditor_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'meditor.dmg')
    os.system(f'open -a "{meditor_path}"')
elif platform.system() == 'Windows':  # Windows
    meditor_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'meditor.exe')
    os.system(f'start "" "{meditor_path}"')
elif platform.system() == 'Linux':  # Linux
    meditor_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'meditor.deb')
    os.system(f'{meditor_path}')
else:
    print('Unsupported operating system')