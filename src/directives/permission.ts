import { DirectiveBinding } from 'vue/types/options';

export default {
  inserted(element: HTMLElement, binding: DirectiveBinding) {
    const hasPermission = binding;

    if (!hasPermission) {
      element.parentNode?.removeChild(element);
    }
  },
};
