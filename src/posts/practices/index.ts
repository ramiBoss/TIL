import type { TILPost } from '../../types';

export const practices: TILPost[] = [
  {
    slug: 'code-quality',
    title: 'Comment the why, not the how',
    date: '2023-02-15',
    category: 'Code Quality',
    description:
      'Focus on explaining the reasoning behind your code rather than the implementation details.',
    tags: ['code quality', 'best practices', 'commenting'],
    readingTime: 2,
    content: `When writing code, it's important to comment on the reasoning behind your decisions rather than just explaining how the code works. This helps future developers (and yourself) understand the context and purpose of the code, making it easier to maintain and modify in the future.
    
\`\`\`javascript
    /* add 1 to counter */
    counter = counter + 1
\`\`\`
     
That kind of comment doesn't help—anyone can read the line and understand it. Instead, use comments to explain why something is done, especially if it's not obvious. Maybe you're working around a bug, dealing with a legacy system, or following a specific business rule. That's the stuff people won't get just by looking at the code.

Good comments give context:
    • Why this code exists
    • Why it's written in a specific way
    • Why something wasn't done another way

Here's a good example from the React codebase:

\`\`\`javascript
/* Currently, key can be spread in as a prop. This causes a potential
 * issue if key is also explicitly declared (ie. <div {...props} key="Hi" />)
 * or <div key="Hi" {...props} /> ). We want to deprecate key spread,
 * but as an intermediary step, we will use jsxDEV for everything except
 * <div {...props} key="Hi" />, because we aren't currently able to tell if
 * key is explicitly declared to be undefined or not.
 */
if (maybeKey !== undefined) {
    key = '' + maybeKey
}
\`\`\`
     
The code is easy to follow. But without the comment, you'd never know the long-term plan or the problem it's working around. That's the kind of helpful comment you want to write.

Code shows what it does. Comments should explain why it does it.`,
  },
];
