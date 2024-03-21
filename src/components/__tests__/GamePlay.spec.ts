import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GameView from "@/views/GameView.vue";

describe("", () => {
  it("renders properly", () => {
    const wrapper = mount(GameView);
    expect(wrapper.text()).toContain("▸");
  });
});
