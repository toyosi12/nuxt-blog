import { mount } from "@vue/test-utils";
import ArticleBox from "../../components/landing/ArticleBox.vue";
import { articleMock } from "../mocks";

describe("ArticleBox", () => {
  it("renders article card with the provided article", () => {
    const wrapper = mount(ArticleBox, {
      props: {
        article: articleMock,
      },
    });

    const articleCard = wrapper.findComponent(".article");

    expect(articleCard.exists()).toBe(true);

    expect(wrapper.getComponent(ArticleBox).props("article")).toMatchObject(
      articleMock,
    );
  });
});
