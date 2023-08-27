import { mount } from "@vue/test-utils";
import SocialBox from "../../components/molecules/SocialBox.vue";

const wrapper = mount(SocialBox);

describe("SocialBox", () => {
  it("renders social box component correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("renders Twitter icon correctly", () => {
    const twitterIcon = wrapper.find(".hdr__socials-icon icon-twitter");
    expect(twitterIcon.exists()).toBe(true);
  });

  it("renders Dribbble icon correctly", () => {
    const dribbbleIcon = wrapper.find(".hdr__socials-icon icon-dribbble");
    expect(dribbbleIcon.exists()).toBe(true);
  });

  it("renders Figma icon correctly", () => {
    const figmaIcon = wrapper.find(".hdr__socials-icon icon-figma");
    expect(figmaIcon.exists()).toBe(true);
  });

  it("renders GitHub icon correctly", () => {
    const githubIcon = wrapper.find(".hdr__socials-icon icon-github");
    expect(githubIcon.exists()).toBe(true);
  });

  it("renders separators correctly", () => {
    const separators = wrapper.findAll(".hdr__socials-separator");
    expect(separators.length).toBe(3);
  });
});
