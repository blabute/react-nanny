

<h2>getDescendantDepthByType&lt;T=React.ReactNode&gt;</h2>
<p>Gets the depth to the first descendant (or self) of each root child that match the specified types</p>
<blockquote><p>If the child does not match any of the specified types or have a descendant that matches, the child is not returned with the result.</p></blockquote><p>Since v2.6.0</p>
<table>
      <thead>
      <tr>
        <th>Param</th>
        <th>Type</th></tr>
      </thead>
      <tbody><tr><td><p><b>children</b></p>JSX children</td><td>T</td></tr><tr><td><p><b>types</b></p>Types of children to match</td><td>any[]</td></tr><tr><td><p><b>{ customTypeKey: '__TYPE' } <span>(optional)</span></b></p>The configuration params</td><td>GetDescendantDepthByType</td></tr></tbody>
    </table><p><b>Returns:</b> {IDescendantDepth&lt;T&gt;[]} - The oldest ancestor with the depth to the matching descendant</p><h4>Supporting Types</h4>

```
// The configuration type for the util:
//   customTypeKey?: string = '__TYPE' - The custom component prop key to check the type

export type GetDescendantDepthByType = { customTypeKey?: string };

// The item type in the returned array:
//   ancestor: T - The oldest ancestor of a matching descendant
//   depthToMatch: number - The depth to the first predicate match; 0 indicates that the oldest ancestor matches

export interface IDescendantDepth<T=React.ReactNode>{ ancestor: T, depthToMatch: number }
```
  <h4>Import</h4>

```
import { getDescendantDepthByType, GetDescendantDepthByType } from 'react-nanny';
```

  <blockquote><p><em>GetDescendantDepthByType</em> is a TypeScript type and is only for (optional) use with TypeScript projects</p></blockquote><h4>Examples</h4>





```    
// Gets depth for all descendants that are of type ToDo (custom component), div, or React Fragment
getDescendantDepthByType(children, ['ToDo', 'div', 'react.fragment']);

// Gets depth for all descendants that are of type MyComponent (custom component - full component passed in), a div, and React Fragment
import MyComponent from './MyComponent';
getDescendantDepthByType(children, [MyComponent, 'div', 'react.fragment']);

// Gets depth for all descendants that are of type ToDo (custom component) with a customized {customTypeKey}
getDescendantDepthByType(children, ['ToDo'], { customTypeKey: 'myTypeKey' });
```

    