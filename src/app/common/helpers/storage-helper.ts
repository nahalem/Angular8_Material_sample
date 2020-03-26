export enum StorageType {
    local = 0,
    session = 1,
  };

export class StorageHelper{
    storageType: Storage;

    constructor(storageType: StorageType){
        this.manageStorageTypes(storageType);
    }

    private manageStorageTypes(storageType: StorageType): any{
        switch (storageType) {
            case StorageType.local:
                this.storageType =  localStorage;
                break;
            case StorageType.session:
                this.storageType =  sessionStorage;
                break;
        }
    }

    getStorage(key: any) : any{
        return JSON.parse(this.storageType.getItem(key.toString()));
    }

    setStorage(key: any, value: any) : any{
        return this.storageType.setItem(key.toString(), JSON.stringify(value));
    }

    removeStorage(key: any) : void{
        this.storageType.removeItem(key.toString());
    }
}