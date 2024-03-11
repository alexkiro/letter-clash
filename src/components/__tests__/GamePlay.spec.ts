import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GamePlay from "@/components/GamePlay.vue";

describe("", () => {
  it("renders properly", () => {
    const wrapper = mount(GamePlay);
    expect(wrapper.text()).toContain("Available letters");
  });
});
