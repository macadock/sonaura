import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import styled from '@emotion/styled'
import Drawer from '../Drawer';
import { useState } from 'react';
import { Box } from '@mui/system';
import List from './List';
import { ItemList } from './List/List.types';

interface Props {

}

const menuItems: ItemList = [
    {
      "name":"Accueil",
      "url":"/",
      "icon":""
    },
    {
      "name":"Catégories",
      "url":"/categories",
      "icon":""
    },
    {
      "name":"Professionnels",
      "url":"/professionnels",
      "icon":""
    },
    {
      "name":"Réalisations",
      "url":"/realisations",
      "icon":""
    },
    {
      "name":"Contact",
      "url":"/contact",
      "icon":""
    }
]


const Header: React.FC<Props> = () => {

  const [drawerState, setDrawerState] = useState<boolean>(false);

  const handleClick = () => {
    setDrawerState(true)
  }

  const onClose = () => {
    setDrawerState(!drawerState)
  }


    return (
      <Wrapper>
        <StyledIconButton onClick={handleClick}>
          <MenuIcon />
        </StyledIconButton>
        <Drawer open={drawerState} onClose={onClose}>
          <List items={menuItems} onClick={onClose} />
        </Drawer>
      </Wrapper>
    )
}

const Wrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 1rem;
  margin-left: 1rem;
`

StyledIconButton.defaultProps = {
  size: "large",
  edge: "start",
  color: "inherit",
  "aria-label":"menu"
}

export default Header;