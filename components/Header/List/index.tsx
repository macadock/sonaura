import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import { List as MuiList, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { ItemList } from './List.types';
import { useRouter } from 'next/router';
import Link from 'next/link'

interface Props {
  items:ItemList;
  onClick: () => void;
}
const List: React.FC<Props> =({
  items,
  onClick,
}) => {



  return (
    <MuiList
      sx={{ width: '100%'}}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {items.map((item) => 
      <Link href={item.url} key={item.name} passHref>
        <ListItemButton onClick={onClick}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      </Link>
      )}
    </MuiList>
  );
}

export default List;