import React from 'react';
import { render } from '@testing-library/react-native';
import EditModal from '../components/edit.modal';

describe('Accessibility checks', () => {
  it('EditModal exposes accessible controls', () => {
    const rendered = render(
      <EditModal
        isVisible={true}
        onClose={() => {}}
        id={'test-id'}
        cName={'Test Counter'}
        cDate={'Jan 1, 2025'}
        type={'countup'}
      />
    );

    const tree = rendered.toJSON();

    const hasA11yLabel = (node, label) => {
      if (!node) return false;
      if (node.props && node.props.accessibilityLabel === label) return true;
      if (node.children && Array.isArray(node.children)) {
        return node.children.some((child) => hasA11yLabel(child, label));
      }
      return false;
    };

    expect(hasA11yLabel(tree, 'Edit counter name')).toBe(true);
    expect(hasA11yLabel(tree, 'Cancel editing')).toBe(true);
    expect(hasA11yLabel(tree, 'Save changes')).toBe(true);
  });
});
