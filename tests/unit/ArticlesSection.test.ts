import { mount } from "@vue/test-utils";
import ArticlesSection from "../../components/landing/ArticlesSection.vue";
import { articleMock } from "../mocks";

describe("ArticlesSection", () => {
  it("renders articles section with the provided articles", () => {
    const wrapper = mount(ArticlesSection, {
      props: {
        articles: [articleMock],
      },
    });

    const articlesSection = wrapper.findComponent(".articles");

    expect(articlesSection.exists()).toBe(true);

    expect(
      wrapper.getComponent(ArticlesSection).props("articles"),
    ).toMatchObject([articleMock]);
  });
});
