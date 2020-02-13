

declare module "promise-sequential" {

    export default function sequential(promises: (() => Promise<unknown>)[]): Promise<void>;

}
