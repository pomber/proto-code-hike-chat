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
        minHeight: 40,
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

  const [state, setState] = React.useState({ count: 0, newKids: [] as any });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const [newKids, done] = sliceKids(kids, prev.count);
        if (done) {
          clearInterval(interval);
        }
        return { count: prev.count + 1, newKids };
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  React.useLayoutEffect(() => {
    document!
      .getElementById('messages-end')!
      .scrollIntoView({ behavior: 'auto' });
  }, [state.count]);

  return <>{state.newKids}</>;
}

function sliceKids(kids: any[], endCount: number) {
  let counter = 0;
  let newKids = [] as any;
  let done = true;

  for (const kid of kids) {
    if (counter >= endCount) {
      done = false;
      break;
    }

    if (kid.type === 'p' && typeof kid.props.children === 'string') {
      const words = kid.props.children.split(' ');
      const remainingCount = endCount - counter;
      const newWords = words.slice(0, remainingCount);

      counter += newWords.length;
      newKids.push(<p>{newWords.join(' ')}</p>);

      if (newWords.length < words.length) {
        done = false;
        break;
      }
    } else {
      newKids.push(kid);
      counter++;
    }
  }

  return [newKids, done];
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
