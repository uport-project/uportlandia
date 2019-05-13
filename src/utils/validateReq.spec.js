import isValid from "./validateReq";
import SERVICES from "../constants/services";

describe("utils::validateReq", () => {
  it("passes if claim requirements are fulfilled", () => {
    const profile = {
      "Uportlandia City ID": {},
      "Insurance": {},
      "Diploma": {}
    };
    expect(isValid(SERVICES["PHARMACY"], profile)).toBe(true);
  });
  it("fails if claim requirements are not fulfilled", () => {
    const profile = {
      "Uportlandia City ID": {},
      "Diploma": {}
    };
    expect(isValid(SERVICES["PHARMACY"], profile)).toBe(false);
  });
});
