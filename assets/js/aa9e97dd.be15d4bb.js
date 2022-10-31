"use strict";(self.webpackChunkreact_native_testing_library_website=self.webpackChunkreact_native_testing_library_website||[]).push([[940],{4150:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return c},default:function(){return h},frontMatter:function(){return s},metadata:function(){return l},toc:function(){return u}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],s={id:"understanding-act",title:"Understanding Act function"},c=void 0,l={unversionedId:"understanding-act",id:"understanding-act",title:"Understanding Act function",description:"When writing RNTL tests one of the things that confuses developers the most are cryptic act() function errors logged into console. In this article I will try to build an understanding of the purpose and behaviour of act() so you can build your tests with more confidence.",source:"@site/docs/UnderstandingAct.md",sourceDirName:".",slug:"/understanding-act",permalink:"/react-native-testing-library/docs/understanding-act",draft:!1,editUrl:"https://github.com/callstack/react-native-testing-library/blob/main/docs/UnderstandingAct.md",tags:[],version:"current",frontMatter:{id:"understanding-act",title:"Understanding Act function"},sidebar:"docs",previous:{title:"Testing Environment",permalink:"/react-native-testing-library/docs/testing-env"},next:{title:"Migration to 11.0",permalink:"/react-native-testing-library/docs/migration-v11"}},p={},u=[{value:"The act warnings",id:"the-act-warnings",level:2},{value:"Synchronous act",id:"synchronous-act",level:2},{value:"Responsibility",id:"responsibility",level:3},{value:"When to use act",id:"when-to-use-act",level:3},{value:"Implementation",id:"implementation",level:3},{value:"Asynchronous act",id:"asynchronous-act",level:2},{value:"Asynchronous code",id:"asynchronous-code",level:3},{value:"Solution with fake timers",id:"solution-with-fake-timers",level:3},{value:"Solution with real timers",id:"solution-with-real-timers",level:3},{value:"Async act warning",id:"async-act-warning",level:3},{value:"References",id:"references",level:2}],d={toc:u};function h(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"When writing RNTL tests one of the things that confuses developers the most are cryptic ",(0,i.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/testing-recipes.html#act"},(0,i.kt)("inlineCode",{parentName:"a"},"act()"))," function errors logged into console. In this article I will try to build an understanding of the purpose and behaviour of ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," so you can build your tests with more confidence."),(0,i.kt)("h2",{id:"the-act-warnings"},"The act warnings"),(0,i.kt)("p",null,"Let\u2019s start with typical ",(0,i.kt)("inlineCode",{parentName:"p"},"act()"),' warnings logged to console. There are two kinds of these issues, let\u2019s call the first one the "sync ',(0,i.kt)("inlineCode",{parentName:"p"},"act()"),'" warning:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Warning: An update to Component inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n")),(0,i.kt)("p",null,"The second one relates to async usage of ",(0,i.kt)("inlineCode",{parentName:"p"},"act"),' so let\u2019s call it the "async ',(0,i.kt)("inlineCode",{parentName:"p"},"act"),'" error:'),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Warning: You called act(async () => ...) without await. This could lead to unexpected\ntesting behaviour, interleaving multiple act calls and mixing their scopes. You should\n- await act(async () => ...);\n")),(0,i.kt)("h2",{id:"synchronous-act"},"Synchronous act"),(0,i.kt)("h3",{id:"responsibility"},"Responsibility"),(0,i.kt)("p",null,"This function is intended only for using in automated tests and works only in development mode. Attempting to use it in production build will throw an error."),(0,i.kt)("p",null,"The responsibility for ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," function is to make React renders and updates work in tests in a similar way they work in real application by grouping and executing related units of interaction (e.g. renders, effects, etc) together."),(0,i.kt)("p",null,"To showcase that behaviour let make a small experiment. First we define a function component that uses ",(0,i.kt)("inlineCode",{parentName:"p"},"useEffect")," hook in a trivial way."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"function TestComponent() {\n  const [count, setCount] = React.useState(0);\n  React.useEffect(() => {\n    setCount((c) => c + 1);\n  }, []);\n\n  return <Text>Count {count}</Text>;\n}\n")),(0,i.kt)("p",null,"In the following tests we will directly use ",(0,i.kt)("inlineCode",{parentName:"p"},"ReactTestRenderer")," instead of RNTL ",(0,i.kt)("inlineCode",{parentName:"p"},"render")," function to render our component for tests. In order to expose familiar queries like ",(0,i.kt)("inlineCode",{parentName:"p"},"getByText")," we will use ",(0,i.kt)("inlineCode",{parentName:"p"},"within")," function from RNTL."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render without act', () => {\n  const renderer = TestRenderer.create(<TestComponent />);\n\n  // Bind RNTL queries for root element.\n  const view = within(renderer.root);\n  expect(view.getByText('Count 0')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"When testing without ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," call wrapping rendering call, we see that the assertion runs just after the rendering but before ",(0,i.kt)("inlineCode",{parentName:"p"},"useEffect"),"hooks effects are applied. Which is not what we expected in our tests."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render with act', () => {\n  let renderer: ReactTestRenderer;\n  act(() => {\n    renderer = TestRenderer.create(<TestComponent />);\n  });\n\n  // Bind RNTL queries for root element.\n  const view = within(renderer!.root);\n  expect(view.getByText('Count 1')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"When wrapping rendering call with ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," we see that the changes caused by ",(0,i.kt)("inlineCode",{parentName:"p"},"useEffect")," hook have been applied as we would expect."),(0,i.kt)("h3",{id:"when-to-use-act"},"When to use act"),(0,i.kt)("p",null,"The name ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," comes from ",(0,i.kt)("a",{parentName:"p",href:"http://wiki.c2.com/?ArrangeActAssert"},"Arrange-Act-Assert")," unit testing pattern. Which means it\u2019s related to part of the test when we execute some actions on the component tree."),(0,i.kt)("p",null,"So far we learned that ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," function allows tests to wait for all pending React interactions to be applied before we make our assertions. When using ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," we get guarantee that any state updates will be executed as well as any enqueued effects will be executed."),(0,i.kt)("p",null,"Therefore, we should use ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," whenever there is some action that causes element tree to render, particularly:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"initial render call - ",(0,i.kt)("inlineCode",{parentName:"li"},"ReactTestRenderer.create")," call"),(0,i.kt)("li",{parentName:"ul"},"re-rendering of component -",(0,i.kt)("inlineCode",{parentName:"li"},"renderer.update")," call"),(0,i.kt)("li",{parentName:"ul"},"triggering any event handlers that cause component tree render")),(0,i.kt)("p",null,"Thankfully, for these basic cases RNTL has got you covered as our ",(0,i.kt)("inlineCode",{parentName:"p"},"render"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"update")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"fireEvent")," methods already wrap their calls in sync ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," so that you do not have to do it explicitly."),(0,i.kt)("p",null,"Note that ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," calls can be safely nested and internally form a stack of calls. However, overlapping ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," calls, which can be achieved using async version of ",(0,i.kt)("inlineCode",{parentName:"p"},"act"),", ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/blob/main/packages/react/src/ReactAct.js#L161"},"are not supported"),"."),(0,i.kt)("h3",{id:"implementation"},"Implementation"),(0,i.kt)("p",null,"As of React version of 18.1.0, the ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," implementation is defined in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/blob/main/packages/react/src/ReactAct.js"},"ReactAct.js source file")," inside React repository. This implementation has been fairly stable since React 17.0."),(0,i.kt)("p",null,"RNTL exports ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," for convenience of the users as defined in the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/callstack/react-native-testing-library/blob/main/src/act.ts"},"act.ts source file"),". That file refers to ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/blob/ce13860281f833de8a3296b7a3dad9caced102e9/packages/react-test-renderer/src/ReactTestRenderer.js#L52"},"ReactTestRenderer.js source")," file from React Test Renderer package, which finally leads to React act implementation in ReactAct.js (already mentioned above)."),(0,i.kt)("h2",{id:"asynchronous-act"},"Asynchronous act"),(0,i.kt)("p",null,"So far we have seen synchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," which runs its callback immediately. This can deal with things like synchronous effects or mocks using already resolved promises. However, not all component code is synchronous. Frequently our components or mocks contain some asynchronous behaviours like ",(0,i.kt)("inlineCode",{parentName:"p"},"setTimeout")," calls or network calls. Starting from React 16.9, ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," can also be called in asynchronous mode. In such case ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," implementation checks that the passed callback returns ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/blob/ce13860281f833de8a3296b7a3dad9caced102e9/packages/react/src/ReactAct.js#L60"},"object resembling promise"),"."),(0,i.kt)("h3",{id:"asynchronous-code"},"Asynchronous code"),(0,i.kt)("p",null,"Asynchronous version of ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," also is executed immediately, but the callback is not yet completed because of some asynchronous operations inside."),(0,i.kt)("p",null,"Lets look at a simple example with component using ",(0,i.kt)("inlineCode",{parentName:"p"},"setTimeout")," call to simulate asynchronous behaviour:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"function TestAsyncComponent() {\n  const [count, setCount] = React.useState(0);\n  React.useEffect(() => {\n    setTimeout(() => {\n      setCount((c) => c + 1);\n    }, 50);\n  }, []);\n\n  return <Text>Count {count}</Text>;\n}\n")),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render async natively', () => {\n  const view = render(<TestAsyncComponent />);\n  expect(view.getByText('Count 0')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"If we test our component in a native way without handling its asynchronous behaviour we will end up with sync act warning:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"Warning: An update to TestAsyncComponent inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n")),(0,i.kt)("p",null,"Note that this is not yet the infamous async act warning. It only asks us to wrap our event code with ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," calls. However, this time our immediate state change does not originate from externally triggered events but rather forms an internal part of the component. So how can we apply ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," in such scenario?"),(0,i.kt)("h3",{id:"solution-with-fake-timers"},"Solution with fake timers"),(0,i.kt)("p",null,"First solution is to use Jest's fake timers inside out tests:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render with fake timers', () => {\n  jest.useFakeTimers();\n  const view = render(<TestAsyncComponent />);\n\n  act(() => {\n    jest.runAllTimers();\n  });\n  expect(view.getByText('Count 1')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"That way we can wrap ",(0,i.kt)("inlineCode",{parentName:"p"},"jest.runAllTimers()")," call which triggers the ",(0,i.kt)("inlineCode",{parentName:"p"},"setTimeout")," updates inside an ",(0,i.kt)("inlineCode",{parentName:"p"},"act")," call, hence resolving the act warning. Note that this whole code is synchronous thanks to usage of Jest fake timers."),(0,i.kt)("h3",{id:"solution-with-real-timers"},"Solution with real timers"),(0,i.kt)("p",null,"If we wanted to stick with real timers then things get a bit more complex. Let\u2019s start by applying a crude solution of opening async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," call for the expected duration of components updates:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render with real timers - sleep', async () => {\n  const view = render(<TestAsyncComponent />);\n  await act(async () => {\n    await sleep(100); // Wait a bit longer than setTimeout in `TestAsyncComponent`\n  });\n\n  expect(view.getByText('Count 1')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"This works correctly as we use an explicit async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," call that resolves the console error. However, it relies on our knowledge of exact implementation details which is a bad practice."),(0,i.kt)("p",null,"Let\u2019s try more elegant solution using ",(0,i.kt)("inlineCode",{parentName:"p"},"waitFor")," that will wait for our desired state:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render with real timers - waitFor', async () => {\n  const view = render(<TestAsyncComponent />);\n\n  await waitFor(() => view.getByText('Count 1'));\n  expect(view.getByText('Count 1')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"This also works correctly, because ",(0,i.kt)("inlineCode",{parentName:"p"},"waitFor")," call executes async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," call internally."),(0,i.kt)("p",null,"The above code can be simplified using ",(0,i.kt)("inlineCode",{parentName:"p"},"findBy")," query:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"test('render with real timers - findBy', async () => {\n  const view = render(<TestAsyncComponent />);\n\n  expect(await view.findByText('Count 1')).toBeTruthy();\n});\n")),(0,i.kt)("p",null,"This also works since ",(0,i.kt)("inlineCode",{parentName:"p"},"findByText")," internally calls ",(0,i.kt)("inlineCode",{parentName:"p"},"waitFor")," which uses async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()"),"."),(0,i.kt)("p",null,"Note that all of the above examples are async tests using & awaiting async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," function call."),(0,i.kt)("h3",{id:"async-act-warning"},"Async act warning"),(0,i.kt)("p",null,"If we modify any of the above async tests and remove ",(0,i.kt)("inlineCode",{parentName:"p"},"await")," keyword, then we will trigger the notorious async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()"),"warning:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-jsx"},"Warning: You called act(async () => ...) without await. This could lead to unexpected\ntesting behaviour, interleaving multiple act calls and mixing their scopes. You should\n- await act(async () => ...);\n")),(0,i.kt)("p",null,"React decides to show this error whenever it detects that async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()"),"call ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/facebook/react/blob/ce13860281f833de8a3296b7a3dad9caced102e9/packages/react/src/ReactAct.js#L93"},"has not been awaited"),"."),(0,i.kt)("p",null,"The exact reasons why you might see async ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," warnings vary, but finally it means that ",(0,i.kt)("inlineCode",{parentName:"p"},"act()")," has been called with callback that returns ",(0,i.kt)("inlineCode",{parentName:"p"},"Promise"),"-like object, but it has not been waited on."),(0,i.kt)("h2",{id:"references"},"References"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://github.com/facebook/react/blob/main/packages/react/src/ReactAct.js"},"React ",(0,i.kt)("inlineCode",{parentName:"a"},"act")," implementation source")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("a",{parentName:"li",href:"https://reactjs.org/docs/testing-recipes.html#act"},"React testing recipes: ",(0,i.kt)("inlineCode",{parentName:"a"},"act()")))))}h.isMDXComponent=!0},3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=a.createContext({}),l=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=l(e.components);return a.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),h=r,m=d["".concat(c,".").concat(h)]||d[h]||u[h]||i;return n?a.createElement(m,o(o({ref:t},p),{},{components:n})):a.createElement(m,o({ref:t},p))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,o[1]=s;for(var l=2;l<i;l++)o[l]=n[l];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);