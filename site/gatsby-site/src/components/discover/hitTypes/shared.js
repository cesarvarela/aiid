import { format, fromUnixTime } from 'date-fns';
import { LocalizedLink } from 'gatsby-theme-i18n';
import React from 'react';
import { Card } from 'react-bootstrap';
import { Highlight } from 'react-instantsearch-dom';
import styled from 'styled-components';

const linkHoverHighlight = `
  a:not(:hover) { color: inherit; }
`;

const HeaderCard = styled(Card.Title)`
  a {
    font-weight: bold;
  }
  ${linkHoverHighlight}
`;

const SubdomainCard = styled(Card.Subtitle)`
  ${linkHoverHighlight}
`;

export function citationReportUrl(item) {
  return '/cite/' + item.incident_id + '#r' + item.objectID;
}

export function HeaderTitle({ item, ...props }) {
  return (
    <HeaderCard {...props}>
      <LocalizedLink to={citationReportUrl(item)} className="text-decoration-none">
        <Highlight hit={item} attribute="title" />
      </LocalizedLink>
    </HeaderCard>
  );
}

export function SourceDomainSubtitle({ item, ...props }) {
  return (
    <SubdomainCard {...props}>
      <a href={item.url}>
        {item.source_domain} &middot; {format(fromUnixTime(item.epoch_date_published), 'yyyy')}
      </a>
    </SubdomainCard>
  );
}

export default {};