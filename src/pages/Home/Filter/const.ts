const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export const menuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const sortValues = [
  {value: 'popularity.asc', name: 'Sort by popularity ↓'},
  {value: 'popularity.desc', name: 'Sort by popularity ↑'},
  {value: 'release_date.asc', name: 'Sort by release date ↓'},
  {value: 'elease_date.desc', name: 'Sort by release date ↑'},
  {value: 'revenue.asc', name: 'Sort by revenue ↓'},
  {value: 'revenue.desc', name: 'Sort by revenue ↑'},
  {value: 'original_title.asc', name: 'Sort by title ↓'},
  {value: 'original_title.desc', name: 'Sort by title ↑'},
  {value: 'vote_average.asc', name: 'Sort by average ↓'},
  {value: 'vote_average.desc', name: 'Sort by average ↑'},
]