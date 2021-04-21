

declare module "node-sass-json-importer" {

    export default function importer(args?: {
        convertCase?: boolean
    }): () => void;

}
