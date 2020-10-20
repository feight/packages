

export interface TestOptions{
    type: string;
}


export const testFunction = function(options: TestOptions): void{

    console.log(options);

};
