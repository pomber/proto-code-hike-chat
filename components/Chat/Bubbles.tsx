import { PropsWithChildren } from 'react';

function Bubble({
  children,
  isQuestion,
}: PropsWithChildren<{ isQuestion: boolean }>) {
  const extraStyle = isQuestion
    ? { backgroundColor: '#0084ff', borderBottomRightRadius: 4 }
    : { backgroundColor: 'rgb(47, 51, 54)', borderTopLeftRadius: 4 };
  return (
    <div
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

export function Answer({ children }: PropsWithChildren<{}>) {
  return <Bubble isQuestion={false}>{children}</Bubble>;
}

export function Writing() {
  // three big animated (using tailwind) dots showing that the user is writing
  return (
    <div className="flex">
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite]" />
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite_100ms]" />
      <div className="w-2 h-2 bg-slate-100 rounded-full mx-1 animate-[bounce_1s_infinite_200ms]" />
    </div>
  );
}
