

declare module "folder-hash" {

    interface HashItem{
        name: string;
        hash: string;
        children: HashItem[]
    }

    export function hashElement(path: string, options: {
        folders: {
            exclude?: string[],
            include?: string[]
        },
        files: {
            exclude?: string[],
            include: string[]
        }

    }): Promise<HashItem>;

}
