import os

def export_env(file_path):
    """Exports environment variables from a .env file to the system environment."""
    if not os.path.isfile(file_path):
        print(f"Error: File {file_path} does not exist.")
        return

    with open(file_path, 'r') as file:
        for line in file:
            line = line.strip()
            if line and not line.startswith('#'):
                try:
                    key, value = line.split('=', 1)
                    key = key.strip()
                    value = value.strip().strip('"').strip("'")
                    os.environ[key] = value
                    print(f"Exported {key}={value}")
                except ValueError:
                    print(f"Skipping invalid line: {line}")

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Usage: python export_env.py /path/to/.env")
    else:
        export_env(sys.argv[1])
