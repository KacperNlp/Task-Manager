import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import AppColumnHeadline from "../../components/AppColumnHeadline.vue";

describe('AppColumnHeadline', () => {
    it('Component renders correctly', () => {
        const wrapper = mount(AppColumnHeadline, {
            props: {
                count: 12,
                text: 'In progress',
                columnType: "progress"
            }
        });

        expect(wrapper.text()).contain('In progress');
        expect(wrapper.text()).contain('12');
        expect(wrapper.find('h2').classes('border-orange-500')).toBe(true);
        expect(wrapper.find('h2 > span').classes('bg-orange-500')).toBe(true);
    })
})