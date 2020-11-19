export default `
  # Headline 1
  ## Headline 2
  ### Headline 3
  #### Headline 4
  ##### Headline 5
  ###### Headline 6

  ------

  Alternatively, for H1 and H2, an underline-ish style:

  Alt-Headline 1
  ======
  Alt-Headline 2
  ------

  ------

  Emphasis, aka italics, with *asterisks* or _underscores_.

  Strong emphasis, aka bold, with **asterisks** or __underscores__.

  Combined emphasis with **asterisks and _underscores_**.

  Escaped content: \\*prepend forward slash\\*.

  Inline \`code\` has \`back-ticks around\` it.

  ------

  1. First ordered list item
  2. Another item
    * Unordered sub-list.
  1. Actual numbers don't matter, just that it's a number
    1. Ordered sub-list
  4. And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).


  * Unordered list can use asterisks
  - Or minuses
  + Or pluses

  ------

  [I'm a relative link](/sandbox)

  [I'm an inline-style link](https://www.google.com)

  [I'm a same-domain inline-style link](https://nebenan.de)

  [I'm a reference-style link][Arbitrary case-insensitive reference text]

  [I'm a relative reference to a file](../images/users/male_01.jpg)
  
  [I'm a link that may try to access window.opener](https://malicious-domain.netlify.app/)

  [You can use numbers for reference-style link definitions][1]

  Or leave it empty and use the [link text itself].

  Some text to show that the reference links can follow later.

  [arbitrary case-insensitive reference text]: https://www.mozilla.org
  [1]: http://slashdot.org
  [link text itself]: http://www.reddit.com

  ------

  Images:

  Inline-style:
  ![alt text](https://c1.staticflickr.com/8/7346/8757771114_03d85b646b.jpg)

  Reference-style:
  ![alt text][logo]

  Image with a link:
  [![alt text](https://c1.staticflickr.com/8/7346/8757771114_03d85b646b.jpg)](http://www.reddit.com)

  [logo]: https://c1.staticflickr.com/8/7346/8757771114_03d85b646b.jpg


  ------

  \`\`\`javascript
  var s = "JavaScript syntax";
  alert(s);
  \`\`\`
  \`\`\`python
  s = "Python syntax"
  print s
  \`\`\`

  \`\`\`
  No language indicated and no syntax.
  Let's throw in a </script><script>alert('XSS')</script>.
  \`\`\`

  ------

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

  Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

  ---

  Hyphens horizontal line test

  ***

  Asterisks horizontal line test

  ___

  Underscores horizontal line test

  ------

  **_THIS SECTION CONTAINS INTENTIONALLY UNSUPPORTED FUNCTIONS AND HAS TO LOOK BROKEN_**

  HTML injection test

  <dl>
    <dt>Definition list</dt>
    <dd>Is something people use sometimes.</dd>

    <dt>Markdown in HTML</dt>
    <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
  </dl>

  Tables test 1

  | Tables        | Are           | Cool  |
  | ------------- |:-------------:| -----:|
  | col 3 is      | right-aligned | $1600 |
  | col 2 is      | centered      |   $12 |
  | zebra stripes | are neat      |    $1 |

  Tables test 2

  Markdown | Less | Pretty
  --- | --- | ---
  *Still* | \`renders\` | **nicely**
  1 | 2 | 3

  Checkboxes test

  - [x] Finish my changes
  - [ ] Push my commits to GitHub
  - [ ] Open a pull request

  Link injection test

  <a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
    "><img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg"
    alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>


  Local links handling test: [i'm a local link!](http://localhost:3000/misc)
`;
