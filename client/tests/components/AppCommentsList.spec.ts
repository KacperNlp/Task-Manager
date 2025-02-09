import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';

import AppCommentsList from "../../components/AppCommentsList.vue";

describe('AppCommentsList', () => {
    it('Component renders message when task do not have any comment', () => {
        const wrapper = mount(AppCommentsList, {
            props: {
                comments: []
            }
        });

        expect(wrapper.text()).contain('No comments...');
    })
})