import { shallowMount } from "@vue/test-utils";
import LoginView from "@/views/Auth/Login.vue";

describe("LoginView.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(LoginView, {});
    expect(wrapper.exists()).toBe(true);
  });
});
