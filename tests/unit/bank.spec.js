import { createLocalVue, mount } from '@vue/test-utils';
import Bank from '@/components/Bank.vue';
import currency from '@/filters/currency';

const localVue = createLocalVue();
localVue.filter('currency', currency);

describe('Bank', () => {
  it('Bank renders total', () => {
    const wrapper = mount(Bank, { localVue });
    const bank = wrapper.getComponent({ name: 'Bank' });
    expect(bank.html()).toContain('Total: 17.600,00 ₴');
  });
});
