// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum StorageKeys {
  token,
  theme,
}

class ApplicationStorage {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setItem(key: keyof typeof StorageKeys, value: string): void {
    this.storage.setItem(key, value);
  }

  getItem(key: keyof typeof StorageKeys): string | null {
    return this.storage.getItem(key);
  }

  removeItem(key: keyof typeof StorageKeys): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }
}

const applicationStorage = new ApplicationStorage();
export { applicationStorage };
