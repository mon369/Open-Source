function add(a, b){
    return a+ b;
}

describe("Add", ()=>{

    it("adds 1 and 3", ()=>{
        expect(add(1,3)).toBe(4);
    })

})