import React from 'react';
import H from 'next/head';

import { withTranslation } from '@I18n';

import { IHead } from './Head';

const HeadComp: React.FunctionComponent<IHead.IProps> = ({
  title: t = '',
  t: i18n,
  showSlogan = true,
}) => {
  let title = t;
  if (showSlogan) {
    title += t.length > 0 ? i18n('Head_Suffix') : i18n('Head_Title');
  }

  return (
    <H>
      <title>{title}</title>
    </H>
  );
};

export const Head = withTranslation('common')(HeadComp);
