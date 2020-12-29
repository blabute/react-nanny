import * as React from 'react';

import { processTypes } from './../_private/utils';
import { typeOfComponent } from '../typeOfComponent';

/**
 * Removes all children by specified type
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {RemoveChildrenByTypeConfig} [{ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByType(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - from import), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * removeChildrenByType(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - as React.ReactNode), a div, and React Fragment
 * const component = getChildByType(['MyComponent']);
 * removeChildrenByType(children, [component, 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * removeChildrenByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To remove a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { removeChildrenByType, RemoveChildrenByTypeConfig }
 */
export const removeChildrenByType = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: RemoveChildrenByTypeConfig = {}) : T[] => {
  const _types = processTypes(types);
  return React.Children.toArray(children).filter(child => _types.indexOf(typeOfComponent(child, customTypeKey)) === -1) as T[];
}

/**
 * Removes all children by specified type (deep search)
 *
 * @since v1.0.0 (modified v2.0.0)
 * @template T
 * @param {T} children - JSX children
 * @param {any[]} types - Types of children to match
 * @param {RemoveChildrenByTypeConfig} [{ customTypeKey: '__TYPE' }] - The configuration params
 * @returns {T[]} - All non-matching children
 * @example
 * // Removes all occurrences of ToDo (custom component), div, and React Fragment
 * removeChildrenByTypeDeep(children, ['ToDo', 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - full component passed in), a div, and React Fragment
 * import MyComponent from './MyComponent';
 * removeChildrenByTypeDeep(children, [MyComponent, 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of MyComponent (custom component - as React.ReactNode), a div, and React Fragment
 * const component = getChildByType(['MyComponent']);
 * removeChildrenByTypeDeep(children, [component, 'div', 'react.fragment']);
 * 
 * // Removes all occurrences of ToDo (custom component) with a customized {customTypeKey}
 * removeChildrenByTypeDeep(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
 * @docgen_note
 * This function will check the prop <em>{customTypeKey}</em> first and then <em>component.type</em> to match core html (JSX intrinsic) elements or component functions. To remove a React Fragment, search for <em>'react.fragment'</em>.
 * @docgen_import { removeChildrenByTypeDeep, RemoveChildrenByTypeConfig }
 */
export const removeChildrenByTypeDeep = <T=React.ReactNode>(children: T, types: any[], { customTypeKey = '__TYPE' }: RemoveChildrenByTypeConfig = {}) : T[] => {
  const _children = React.Children.toArray(children);
  const _types = processTypes(types);
  let output = [];

  for (const child of _children) {
    if (_types.indexOf(typeOfComponent(child, customTypeKey)) === -1) {

      if ((child as any)?.props?.children) {
        output = [
          ...output, 
          {
            ...(child as any),
            props: {
              ...(child as any).props,
              children: Array.isArray((child as any).props.children) 
                        ? removeChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })
                        : removeChildrenByTypeDeep<T>((child as any).props.children, _types, { customTypeKey })[0] ?? [],
            }
          }
        ];
      } else {
        output = [...output, child as T];
      }
    } 
  }

  return output;
};

export type RemoveChildrenByTypeConfig = { customTypeKey?: string };