import { mount } from "@vue/test-utils";
import LoadMoreBtn from "../../components/molecules/LoadMoreBtn.vue";

describe("LoadMoreBtn", () => {
  it("renders process-loader when isMoreLoading is true", () => {
    const wrapper = mount(LoadMoreBtn, {
      props: {
        isMoreLoading: true,
        onClick: vi.fn(),
      },
    });

    const loader = wrapper.findComponent('[data-testid="process-loader"]');
    expect(loader.exists()).toBe(true);
  });

  it("renders load more button when isMoreLoading is false", () => {
    const wrapper = mount(LoadMoreBtn, {
      props: {
        isMoreLoading: false,
        onClick: vi.fn(),
      },
    });

    const btn = wrapper.findComponent('[data-testid="load-more-btn"]');
    expect(btn.exists()).toBe(true);
  });
});
