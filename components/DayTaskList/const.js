export const menuItems = [
  {
    title: 'Edit',
    key: 'edit',
  },
  {
    title: 'Move',
    key: 'move',
  },
  {
    title: 'Delete',
    key: 'del',
  },
];

export const linkItem = {
  title: 'Link',
  key: 'link',
};

export const sortItems = [
  {
    title: 'Timed on top & Title asc.',
    key: 'top_asc',
  },
  {
    title: 'Timed on top & Title desc.',
    key: 'top_desc',
  },
  {
    title: 'Timed on bottom & Title asc.',
    key: 'bot_asc',
  },
  {
    title: 'Timed on bottom & Title desc.',
    key: 'bot_desc',
  },
  {
    title: 'Linked Order',
    key: 'linked',
  },
];

export const genSortItems = [
  {
    title: 'Title asc.',
    key: 'asc',
  },
  {
    title: 'Title desc.',
    key: 'desc',
  },
  {
    title: 'Linked Order',
    key: 'linked',
  },
];

export const sortItemTitles = {
  [sortItems[0].key]: sortItems[0].title,
  [sortItems[1].key]: sortItems[1].title,
  [sortItems[2].key]: sortItems[2].title,
  [sortItems[3].key]: sortItems[3].title,
  [sortItems[4].key]: sortItems[4].title,
  [genSortItems[0].key]: genSortItems[0].title,
  [genSortItems[1].key]: genSortItems[1].title,
  [genSortItems[2].key]: genSortItems[2].title,
};
