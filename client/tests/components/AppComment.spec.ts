import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';

import AppComment from '../../components/AppComment.vue';
import { UserRoles } from '../../types/types';


describe('AppComment', () => {
    it('AppComment is properly rendering', () => {
        const comment = {
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
        }

        const wrapper = mount(AppComment, {
            props: {
                comment
            },
            global: {
                stubs: {
                    UCard: {
                        template: '<div><slot></slot></div>'
                    },
                    UAvatar: {
                        template: '<span />'
                    }
                }
            }
        })

        expect(wrapper.text()).contain('Test comment');
        expect(wrapper.text()).contain('test@gmail.com');
    })
})