import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PlaceType } from "../../types/place";
import s from "./Search.module.css";

type SearchListProps = {
  listPlace: PlaceType[];
  onClick: (item: PlaceType) => void;
};

export const SearchList = ({ listPlace, onClick }: SearchListProps) => (
  <div className={s.list}>
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
  </div>
);
