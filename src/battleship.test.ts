import {add} from "./main";
import {describe, it, expect} from "vitest";

describe('add', () => {
    it('should add 2 and 6', () => {
        expect(add(2,6)).toBe(8)
    });
});
