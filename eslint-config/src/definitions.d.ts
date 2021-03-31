

declare module "*.md" {

    const content: string;

    export default content;

}


declare module "*.mdx" {

    import type React from "react";

    const content: React.ComponentClass;

    export default content;

}

