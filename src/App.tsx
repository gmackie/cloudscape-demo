import React, { useState } from 'react';

import AppLayout from '@cloudscape-design/components/app-layout';
import Button from '@cloudscape-design/components/button';
import Box from '@cloudscape-design/components/box';
import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Table from '@cloudscape-design/components/table';
import TopNavigation from '@cloudscape-design/components/top-navigation';

const navItems: SideNavigationProps.Item[] = [
  {
    type: 'section',
    text: 'Manage',
    items: [
      { type: 'link', text: 'Pages', href: '#/pages' },
      { type: 'link', text: 'Users', href: '#/users' },
    ],
  },
  {
    type: 'section',
    text: 'Set up',
    items: [
      { type: 'link', text: 'Database', href: '#/database' },
      { type: 'link', text: 'Authentication', href: '#/authentication' },
      { type: 'link', text: 'Analytics', href: '#/analytics' },
      { type: 'link', text: 'Predictions', href: '#/predictions' },
      { type: 'link', text: 'Interactions', href: '#/interactions' },
      { type: 'link', text: 'Notifications', href: '#/notifications' },
    ],
  },
];

const breadcrumbs = [
  {
    text: 'Service name',
    href: '#',
  },
  {
    text: 'Pages',
    href: '#',
  },
];

const i18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const profileActions = [
  { type: 'button', id: 'profile', text: 'Profile' },
  { type: 'button', id: 'preferences', text: 'Preferences' },
  { type: 'button', id: 'security', text: 'Security' },
  {
    type: 'menu-dropdown',
    id: 'support-group',
    text: 'Support',
    items: [
      {
        id: 'documentation',
        text: 'Documentation',
        href: '#',
        external: true,
        externalIconAriaLabel: ' (opens in new tab)',
      },
      { id: 'feedback', text: 'Feedback', href: '#', external: true, externalIconAriaLabel: ' (opens in new tab)' },
      { id: 'support', text: 'Customer support' },
    ],
  },
  { type: 'button', id: 'signout', text: 'Sign out' },
];

interface Page {
  name: string;
  type: string;
  size: string;
  description: string;
}

const columnDefinitions = [
  {
    id: 'name',
    cell: (item: Page) => item.name,
    header: 'Name',
    minWidth: 160,
  },
  {
    id: 'type',
    header: 'Type',
    cell: (item: Page) => item.type,
    minWidth: 100,
  },
  {
    id: 'size',
    header: 'Size',
    cell: (item: Page) => item.size,
    minWidth: 100,
  },
  {
    id: 'description',
    header: 'Description',
    cell: (item: Page) => item.description,
    minWidth: 100,
  },
];

const Content = () => {
  return (
    <Table
      items={[]}
      columnDefinitions={columnDefinitions}
      variant="full-page"
      header={
        <Header
          variant="awsui-h1-sticky"
          counter="(0)"
          actions={
            <SpaceBetween size="xs" direction="horizontal">
              <Button disabled>View details</Button>
              <Button disabled>Edit</Button>
              <Button disabled>Delete</Button>
              <Button variant="primary">Create page</Button>
            </SpaceBetween>
          }
        >
          Pages
        </Header>
      }
      stickyHeader={true}
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign="center" color="inherit">
          <SpaceBetween size="xxs">
            <div>
              <b>No pages</b>
              <Box variant="p" color="inherit">
                You don&apos;t have any pages.
              </Box>
            </div>
            <Button>Create page</Button>
          </SpaceBetween>
        </Box>
      }
    />
  );
};

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <TopNavigation
        i18nStrings={i18nStrings}
        identity={{
          href: '#',
          title: 'Service name',
        }}
        search={
          <Input
            ariaLabel="Input field"
            clearAriaLabel="Clear"
            value={searchValue}
            type="search"
            placeholder="Search"
            onChange={({ detail }) => setSearchValue(detail.value)}
          />
        }
        utilities={[
          {
            type: 'button',
            iconName: 'notification',
            ariaLabel: 'Notifications',
            badge: true,
            disableUtilityCollapse: true,
          },
          { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
          {
            type: 'menu-dropdown',
            text: 'Customer name',
            description: 'customer@example.com',
            iconName: 'user-profile',
            items: profileActions,
          },
        ]}
      />
      <AppLayout
        stickyNotifications
        toolsHide
        headerSelector="#header"
        ariaLabels={{ navigationClose: 'close' }}
        navigation={<SideNavigation activeHref="#/pages" items={navItems} />}
        breadcrumbs={<BreadcrumbGroup items={breadcrumbs} expandAriaLabel="Show path" ariaLabel="Breadcrumbs" />}
        contentType="table"
        content={<Content />}
      />
    </>
  );
}
