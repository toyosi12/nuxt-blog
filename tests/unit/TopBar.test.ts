import { mount } from "@vue/test-utils";

import TopBar from "../../components/molecules/TopBar.vue";
const wrapper = mount(TopBar);

describe("Header", () => {
  it("renders header component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("contains a logo", () => {
    const logoElement = wrapper.find("#logo");
    expect(logoElement.exists()).toBe(true);
  });

  it("contains the social icons", () => {
    const socialElement = wrapper.find(".hdr__social-container");
    expect(socialElement.exists()).toBe(true);
  });
});
