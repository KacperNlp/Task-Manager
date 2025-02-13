import { describe, it, expect } from "vitest";
import { mount } from '@vue/test-utils';

import AppCommentsList from "../../components/AppCommentsList.vue";
import AppComment from "../../components/AppComment.vue";
import { UserRoles } from '../../types/types';

const comments = [{
    _id:  '12',
    taskId: '12',
    user: {
        _id: '123',
        email: 'test@gmail.com',
        name: 'Test',
        surname: 'Test',
        role: UserRoles.FE
    },
    text: 'Test comment',
    date: new Date()
}]

describe('AppCommentsList', () => {
    it('Comments List renders message when task do not have any comment', () => {
        const wrapper = mount(AppCommentsList, {
            props: {
                comments: []
            }
        });

        expect(wrapper.text()).contain('No comments...');
    })

    it('Comments List render comments list when task has any comment', () => {
        const wrapper = mount(AppCommentsList, {
            props: {
                comments
            },
            global: {
                components: { AppComment }
            }
        });

        expect(wrapper.text()).not.toContain('No comments...');

        const listItems = wrapper.findAll("li");
        expect(listItems.length).toBe(comments.length);

        expect(listItems[0].text()).toContain('Test comment');
    })

    it('Renders AppComment for each comment', () => {
        const wrapper = mount(AppCommentsList, {
            props: {
                comments
            },
            global: {
                components: {
                    AppComment
                }
            }
        })

        expect(wrapper.findComponent(AppComment).exists()).toBe(true);
    })
})