import type { FunctionComponent, PropsWithChildren } from 'react';

type Props = Required<PropsWithChildren>;

export const composeWrappers = (
  wrappers: FunctionComponent<Props>[],
): FunctionComponent<Props> => {
  return wrappers.reverse().reduce((Stack, Current): FunctionComponent<Props> => {
    return props => (
      <Current>
        <Stack {...props} />
      </Current>
    );
  });
};
