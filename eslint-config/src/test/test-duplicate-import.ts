

import type { TestOptions } from "./test-duplicate-import-from";
import { testFunction } from "./test-duplicate-import-from";


testFunction({
    type: "test"
} as TestOptions);