import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "styled-components";
import { PlaceType } from "../../types/place";

const ListWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: 56px;
  max-height: 232px;
  overflow-y: auto;
  z-index: 1001;
`;

type SearchListProps = {
  listPlace: PlaceType[];
  onClick: (item: PlaceType) => void;
};

export const SearchList = ({ listPlace, onClick }: SearchListProps) => (
  <ListWrapper>
    <List component="nav" aria-label="main mailbox folders">
      {listPlace.map((item) => {
        return (
          <div key={item?.place_id}>
            <ListItem button onClick={() => onClick(item)}>
              <ListItemIcon>
                <img
                  src="./placeholder.png"
                  alt="Placeholder"
                  style={{ width: 38, height: 38 }}
                />
              </ListItemIcon>
              <ListItemText primary={item?.display_name} />
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  </ListWrapper>
);
