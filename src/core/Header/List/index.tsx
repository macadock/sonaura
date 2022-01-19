import {
  List as MuiList,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Link from 'next/link';
import { Pages } from '../../../../gql/__generated__/pages';

interface Props {
  menuItems: Pages | undefined;
  onClick: () => void;
}
const List: React.FC<Props> = ({ menuItems, onClick }) => {
  return (
    <MuiList
      sx={{ width: '100%' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {menuItems &&
        menuItems.pages.map((menuItem) => (
          <Link href={menuItem.url || '/'} key={menuItem.name} passHref>
            <ListItemButton onClick={onClick}>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary={menuItem.title} />
            </ListItemButton>
          </Link>
        ))}
    </MuiList>
  );
};

export default List;
