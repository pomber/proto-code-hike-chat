import React, { PropsWithChildren } from 'react';

function Bubble({
  children,
  isQuestion,
}: PropsWithChildren<{ isQuestion: boolean }>) {
  const extraStyle = isQuestion
    ? { backgroundColor: '#0084ff', borderBottomRightRadius: 3 }
    : { backgroundColor: 'rgb(47, 51, 54)', borderTopLeftRadius: 3 };
  return (
    <div
      className={isQuestion ? 'question' : 'answer'}
      style={{
        // margin: '10px 0',
        padding: '16px',
        borderRadius: 16,
        color: 'white',
        lineHeight: '1.5',
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

export function Question({ children }: PropsWithChildren<{}>) {
  return <Bubble isQuestion>{children}</Bubble>;
}

export function Answer({
  children,
  thinking,
  writing,
}: PropsWithChildren<{ thinking: boolean; writing: boolean }>) {
  console.log({ children });
  return (
    <Bubble isQuestion={false}>
      {thinking ? (
        <Thinking />
      ) : writing ? (
        <Writing>{children}</Writing>
      ) : (
        children
      )}
    </Bubble>
  );
}

function Writing({ children }: PropsWithChildren<{}>) {
  const kids = React.Children.toArray(children);
  const [lastWordIndex, setLastWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLastWordIndex((i) => i + 1);
      if (lastWordIndex >= kids.length) {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  React.useLayoutEffect(() => {
    document!
      .getElementById('messages-end')!
      .scrollIntoView({ behavior: 'auto' });
  }, [lastWordIndex]);

  let counter = 0;
  let newKids = [] as any;

  kids.forEach((kid: any) => {
    if (counter >= lastWordIndex) {
      return;
    }
    if (kid.type === 'p' && typeof kid.props.children === 'string') {
      const words = kid.props.children.split(' ');
      const newWords = words.slice(0, lastWordIndex - counter);
      counter += newWords.length;
      newKids.push(<p>{newWords.join(' ')}</p>);
    } else {
      newKids.push(kid);
    }
  });

  return <>{newKids}</>;
}

export function Thinking() {
  return (
    <div className="flex">
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite]" />
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite_100ms]" />
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite_200ms]" />
    </div>
  );
}
