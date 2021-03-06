import React from 'react';
import H from 'next/head';
import { useSelector } from 'react-redux';

import { getClient } from '@Selectors';
import { UtilService } from '@Services';
import { withTranslation } from '@I18n';

import { Head } from '../Head';
import { IClientHead } from './ClientHead';

const ClientHeadComp: React.FunctionComponent<IClientHead.IProps> = ({
  title: t = '',
  t: i18n,
  clientId,
}) => {
  const client = useSelector(getClient(clientId));
  if (!client) return <Head />;

  let title = `@${client.username}`;
  if (client.nickname) title += ` (${client.nickname})`;
  if (t.length > 0) title = `${title} - ${t}`;
  title += i18n('Head_Suffix');

  const list = [
    <meta key="twitter:title" name="twitter:title" content={title} />,
    <meta key="og:title" property="og:title" content={title} />,
  ];

  if (client.avatar) {
    const imageUrl = UtilService.getImageUrl(client.avatar, 300, 300);
    list.push(<meta key="twitter:image" name="twitter:image" content={imageUrl} />);
    list.push(<meta key="og:image" property="og:image" content={imageUrl} />);
  }

  return (
    <H>
      <title>{title}</title>
      {list}
    </H>
  );
};

export const ClientHead = withTranslation('common')(ClientHeadComp);
