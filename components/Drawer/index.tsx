import styled from '@emotion/styled';
import { Drawer as MuiDrawer, IconButton, useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { MenuOpen } from '@mui/icons-material';

interface Props {
    open: boolean;
    onClose: () => void;
}

const Drawer: React.FC<Props> = ({
    open,
    onClose,
    children,
}) => {
    
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <StyledDrawer anchor='left' open={open} onClose={onClose} isdesktop={isDesktop}>
            <DrawerHeader>
            <StyledIconButton onClick={onClose}>
                <MenuOpen />
            </StyledIconButton>
            </DrawerHeader>
            <DrawerContent>
                {children}
            </DrawerContent>
            <DrawerFooter/>
        </StyledDrawer>
    )

}

const StyledDrawer = styled(MuiDrawer)<{isdesktop: boolean}>`
.MuiDrawer-paper {
    width: ${props => props.isdesktop ? "20rem" : "90%"};
}
`
const DrawerHeader = styled(Box)`
    display:flex;
    justify-content:end;
`

const DrawerContent = styled(Box)``

const DrawerFooter = styled(Box)``

const StyledIconButton = styled(IconButton)`
  margin: 1rem;
`

StyledIconButton.defaultProps = {
  size: "large",
  edge: "start",
  color: "inherit",
  "aria-label":"menu"
}

export default Drawer;