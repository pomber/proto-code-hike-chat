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
        margin: '10px 0',
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
